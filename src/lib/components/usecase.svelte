<script lang="ts">
	import { slide } from 'svelte/transition';
	import Level from '$lib/components/level.svelte';
	import Flow from '$lib/components/flow.svelte';
	import type { UseCaseSchema } from '$lib/schema/use-case';

	export let name: string;
	export let usecases: UseCaseSchema[];

	let isOpen = false;
</script>

<div class="bg-white text-slate-800">
	<button
		class="w-full flex items-center justify-between text-slate-900 py-2 px-3 border cursor-pointer"
		on:click={() => isOpen = !isOpen}
	>
		<span class="font-medium capitalize">
			{name}
		</span>
		<svg
			xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 16 16"
			class="transition-transform {isOpen ? 'rotate-180' : ''}"
		>
			<path
				fill="currentColor" fill-rule="evenodd"
				d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
			/>
		</svg>
	</button>
	{#if isOpen}
		<div transition:slide>
			{#each usecases as usecase (usecase.id)}
				<div class="bg-whiteborder-slate-200">
					<table class="border w-full">
						<tbody>
							<tr>
								<td class="w-3/6 border px-4 py-2">
									<strong class="text-slate-900 font-medium">Use Case Name: </strong> {usecase.name}
								</td>
								<td class="w-1/6 border px-4 py-2">
									<div class="flex items-center justify-between">
										<strong class="text-slate-900 font-medium">ID: </strong>
										<div class="inline-block text-sm py-1 px-2 font-medium rounded-md bg-blue-100">
											{usecase.id}
										</div>
									</div>
								</td>
								<td class="w-2/6 border px-4 py-2">
									<Level level={usecase.level} />
								</td>
							</tr>
							<tr>
								<td colspan="2" class="border px-4 py-2">
									<strong class="text-slate-900 font-medium">Primary Actor: </strong> {usecase.actor}
								</td>
								<td class="border px-4 py-2">
									<strong class="text-slate-900 font-medium">Use Case Type: </strong>
									<ul class="list-disc list-inside">
										{#each usecase.type as type}
											<li class="capitalize">{type}</li>
										{/each}
									</ul>
								</td>
							</tr>
							<tr>
								<td colspan="3" class="border px-4 py-2">
									<strong class="text-slate-900 font-medium">Stakeholder and Interest:</strong>
									{#each usecase.stakeholders as stakeholder (stakeholder.name)}
										<p>{stakeholder.name} – {stakeholder.interest}</p>
									{/each}
							</tr>
							<tr>
								<td colspan="3" class="border px-4 py-2">
									<strong class="text-slate-900 font-medium">Brief Description:</strong>
									<p>{usecase.description}</p>
								</td>
							</tr>
							<tr>
								<td colspan="3" class="border px-4 py-2">
									<strong class="text-slate-900 font-medium">Trigger:</strong>
									<ul class="list-disc list-inside">
										{#each usecase.triggers as trigger}
											<li>
												{trigger.name} - <span class="capitalize">{trigger.type}</span>
											</li>
										{/each}
									</ul>
							</tr>
							<tr>
								<td colspan="3" class="border px-4 py-2">
									<strong class="text-slate-900 font-medium">Association:</strong>
									<ul class="list-disc list-inside">
										{#each usecase.relationship.association as association}
											<li>{association}</li>
										{/each}
									</ul>
									<strong class="text-slate-900 font-medium">Extends:</strong>
									<ul class="list-disc list-inside">
										{#each usecase.relationship.extends as extend}
											<li>{extend}</li>
										{/each}
									</ul>
									<strong class="text-slate-900 font-medium">Include:</strong>
									<ul class="list-disc list-inside">
										{#each usecase.relationship.include as include}
											<li>{include}</li>
										{/each}
									</ul>
									<strong class="text-slate-900 font-medium">Generalisation:</strong>
									<ul class="list-disc list-inside">
										{#each usecase.relationship.generalization as generalization}
											<li>{generalization}</li>
										{/each}
									</ul>
								</td>
							</tr>
							<tr>
								<td colspan="3" class="border px-4 py-2">
									<strong class="block mb-2 text-slate-900 font-medium">Normal Flow of Events:</strong>
									<Flow events={usecase.flowOfEvents} />
								</td>
							</tr>
							<tr>
								<td colspan="3" class="border px-4 py-2">
									<strong class="block text-slate-900 font-medium">Alternative Flows:</strong>
									{#each usecase.alternativeFlows as alternateFlow}
										<Flow {...alternateFlow} />
									{:else}
										None
									{/each}
								</td>
							</tr>
							<tr>
								<td colspan="3" class="border px-4 py-2">
									<strong class="block text-slate-900 font-medium">Exception Flows:</strong>
									{#each usecase.exceptionFlows as exceptionFlows}
										<Flow {...exceptionFlows} />
									{/each}
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			{/each}
		</div>
	{/if}
</div>