<script lang="ts">
	import { scoreStore } from '../stores/score-store';
	import { t } from '../lib/translations';
	import { deleteRoundAt } from '../lib/game-actions';
	import RoundBadges from './RoundBadges.svelte';

	let activeRowIndex: number | null = null;

	function toggleRow(index: number): void {
		activeRowIndex = activeRowIndex === index ? null : index;
	}

	function deleteScore(index: number): void {
		deleteRoundAt(index);
		activeRowIndex = null;
	}

	function handleKeyDown(event: KeyboardEvent, index: number): void {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			toggleRow(index);
		}
	}
</script>

<div class="overflow-x-auto">
	<table class="table w-full">
		<thead>
			<tr>
				<th>{$t.gameControls.scoreTeamA}</th>
				<th>{$t.gameControls.scoreTeamB}</th>
			</tr>
		</thead>
		<tbody>
			{#each $scoreStore.rounds as round, index}
				<tr
					class="hover cursor-pointer"
					on:click={() => toggleRow(index)}
					on:keydown={(e) => handleKeyDown(e, index)}
					tabindex="0"
					role="button"
					aria-expanded={activeRowIndex === index}
					aria-controls={`details-${index}`}
				>
					<td>
						{round.points.A}
						<RoundBadges flags={round.flags.A} />
					</td>
					<td>
						{round.points.B}
						<RoundBadges flags={round.flags.B} />
					</td>
				</tr>
				{#if activeRowIndex === index}
					<tr id={`details-${index}`}>
						<td colspan="2">
							<div class="flex justify-end items-center p-2 bg-base-200">
								<button class="btn btn-error btn-sm" on:click={() => deleteScore(index)}>
									{$t.gameControls.delete}
								</button>
							</div>
						</td>
					</tr>
				{/if}
			{/each}
		</tbody>
	</table>
</div>
