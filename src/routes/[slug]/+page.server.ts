import { useCaseSchema, type UseCaseSchema } from '$lib/schema/use-case';
import path from 'node:path';

type Content = {
	domain: string;
	name: string;
	usecases: UseCaseSchema[];
}

/** @type {import('../../../.svelte-kit/types/src/routes').PageLoad} */
export async function load({ params }): Promise<{ contents: Record<string, Content[]> }> {
	let contents: Content[] = [];

	// read files from directory
	if (params.slug === 'yukbisayuk') {
		const modules = import.meta.glob('../../lib/data/yukbisayuk/**/*.yaml', { eager: true });
		contents = await Promise.all(Object.entries(modules).map(([filename, content]) => {
			const filepath = filename.split('/');
			const domain = filepath[filepath.length - 2].replaceAll('-', ' ');
			const name = path.basename(filename, '.yaml');
			// @ts-expect-error - we know that content is a record from yaml, but it is unknown
			// so, we make sure by validating its content using zod
			const usecases = content['default']['use-cases'];
			return {
				domain,
				name,
				// @ts-expect-error - we know that usecases is an array of use-case, but it is unknown to typescript
				usecases: usecases.map((usecase) => useCaseSchema.parse(usecase) as UseCaseSchema)
			};
		})) as Content[];
	}

	// group by domain
	const groupedContents = contents.reduce((acc, content) => {
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