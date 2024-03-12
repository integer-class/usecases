<script lang="ts">
	import type { FlowOfEventsSchema } from '$lib/schema/use-case';

	export let name: string | null = null;
	export let events: FlowOfEventsSchema[];
</script>

{#if name !== null}
	<strong class="block mt-2 text-slate-900 font-medium">{name}</strong>
{/if}

<div class="flex">
	<ul class="flex-1 bg-blue-50">
		<li class="border border-blue-200 p-2 text-center font-medium">Actor</li>
		{#each events.map((flow, index) => ({ ...flow, index: index + 1 })).filter(flow => flow.type === "actor") as flow}
			<li class="border border-blue-200 p-2">{flow.index}. {flow.name}</li>
		{/each}
	</ul>
	<ul class="flex-1 bg-pink-50">
		<li class="border border-pink-200 p-2 text-center font-medium">System</li>
		{#each events.map((flow, index) => ({ ...flow, index: index + 1 })).filter(flow => flow.type === "system") as flow}
			<li class="border border-pink-200 p-2">{flow.index}. {flow.name}</li>
		{/each}
	</ul>
</div>
