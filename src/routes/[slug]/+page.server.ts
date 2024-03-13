import { useCaseSchema, type UseCaseSchema } from '$lib/schema/use-case';
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'yaml';

type Content = {
	domain: string;
	name: string;
	usecases: UseCaseSchema[];
}

const dataBasedir = path.resolve(fileURLToPath(import.meta.url), '..', '..', '..', 'lib', 'data');

/** @type {import('../../../.svelte-kit/types/src/routes').PageLoad} */
export async function load({ params }): Promise<{ contents: Record<string, Content[]> }> {
	// read files from directory
	const files = await readdir(`${dataBasedir}/${params.slug}`, { encoding: 'utf-8', recursive: true });
	// filter files that has .yaml extension
	const yamlFiles = files.filter((file) => file.endsWith('.yaml'));
	// read file contents
	const fileContents = await Promise.all(yamlFiles.map(async (file) => {
		const content = await readFile(`${dataBasedir}/${params.slug}/${file}`, { encoding: 'utf-8' });
		const directory = path.dirname(file);
		const [filename] = path.basename(file).split('.');
		return {
			domain: directory,
			name: filename,
			content
		};
	}));

	// parse to json
	const parsedContents = fileContents.map((file) => ({
		domain: file.domain.replace(/-/g, ' '),
		name: file.name.replace(/-/g, ' '),
		usecases: parse(file.content)['use-cases']
	}));

	// validate the schema
	const yamlContents = parsedContents.flatMap((content) => {
		const parsedContents = content.usecases.map((useCase: unknown) => useCaseSchema.parse(useCase));
		return {
			domain: content.domain,
			name: content.name,
			usecases: parsedContents
		};
	});

	// group by domain
	const groupedContents = yamlContents.reduce((acc, content) => {
		const domain = content.domain;
		if (!acc.has(domain)) {
			acc.set(domain, []);
		}
		const current = acc.get(domain);
		if (!current) return acc;
		acc.set(domain, [...current, content]);
		return acc;
	}, new Map<string, Content[]>());

	for (const [key, value] of groupedContents) {
		// indexing by 0 should be safe since we have decided for each file to have only one use-case
		const sortedValue = value.sort((a, b) => a.usecases[0].id.localeCompare(b.usecases[0].id));
		groupedContents.set(key, sortedValue);
	}

	return {
		contents: Object.fromEntries(groupedContents)
	};
}