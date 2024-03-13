<script lang="ts">
	import UseCase from '$lib/components/usecase.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>Use Cases List</title>
</svelte:head>

<a href="/" class="block text-sky-700 underline text-center mt-4">Back to Home</a>
<h1 class="text-center text-slate-800 text-3xl mt-2 mb-2 font-semibold">Use Cases List</h1>
<p class="text-center mx-auto text-slate-700 leading-relaxed">
	The use cases are organized by domain. Each domain is a category of use cases that are related to each other.
</p>
<div class="flex flex-col gap-8 max-w-screen-lg mx-auto p-4 mt-4">
	{#each Object.keys(data.contents).sort() as domain}
		<div>
			<h1 class="capitalize text-xl font-semibold text-slate-800 mb-2">{domain}</h1>
			<div class="flex flex-col">
				{#each data.contents[domain] as content (content.name)}
					<UseCase {...content} />
				{/each}
			</div>
		</div>
	{/each}
</div>