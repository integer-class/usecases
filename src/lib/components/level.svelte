<script lang="ts">
	import type { LevelSchema } from '../schema/use-case.js';

	export let level: LevelSchema = 'low';
</script>

<div class="py-1 px-2">
	<div class="flex items-center justify-between mb-1">
		<div class="text-sm text-slate-800 font-semibold">Importance Level</div>
		<div class="text-xs text-gray-600 uppercase">{level}</div>
	</div>
	<div class="h-2 bg-gray-200 rounded-full overflow-hidden">
		{#if level === "low"}
			<div class="h-full bg-green-400" style="width: 33.3333%"></div>
		{:else if level === "medium"}
			<div class="h-full bg-yellow-400" style="width: 66.6666%"></div>
		{:else}
			<div class="h-full bg-red-400" style="width: 100%"></div>
		{/if}
	</div>
</div>