<script lang="ts">
	import { onMount } from 'svelte';
	import { scoreStore } from '../stores/score-store';
	import { t } from '../lib/translations';
	import { deleteRoundAt } from '../lib/game-actions';
	import type { Round } from '../lib/round';
	import ScoreBadge from './ScoreBadge.svelte';

	let activeRowIndex: number | null = null;
	let touchStartX: number | null = null;
	let touchRowIndex: number | null = null;
	let suppressClick = false;

	function deleteScore(index: number): void {
		deleteRoundAt(index);
		activeRowIndex = null;
	}

	function handleRowClick(index: number): void {
		if (suppressClick) {
			suppressClick = false;
			return;
		}
		activeRowIndex = activeRowIndex === index ? null : index;
	}

	function handleRowKey(event: KeyboardEvent, index: number): void {
		if (event.key === 'Enter' || event.key === ' ') {
			handleRowClick(index);
		}
	}

	function handleClickOutside(event: MouseEvent): void {
		const target = event.target as HTMLElement;
		if (!target.closest('.score-row')) {
			activeRowIndex = null;
		}
	}

	function handleTouchStart(event: TouchEvent, index: number): void {
		touchStartX = event.touches[0]?.clientX ?? null;
		touchRowIndex = index;
	}

	function handleTouchEnd(event: TouchEvent, index: number): void {
		if (touchStartX === null || touchRowIndex !== index) {
			return;
		}
		const touchEndX = event.changedTouches[0]?.clientX ?? touchStartX;
		const deltaX = touchStartX - touchEndX;
		if (deltaX > 80) {
			suppressClick = true;
			deleteScore(index);
		}
		touchStartX = null;
		touchRowIndex = null;
	}

	function teamBadges(round: Round, team: 'A' | 'B') {
		const flags = round.flags[team];
		return { flags, points: round.points[team] };
	}

	onMount(() => {
		document.addEventListener('click', handleClickOutside);
		return () => document.removeEventListener('click', handleClickOutside);
	});
</script>

<div class="w-full px-5 my-4 overflow-y-auto flex-grow z-0">
	<div class="flex flex-col space-y-2">
		{#each $scoreStore.rounds as round, index}
			{@const teamA = teamBadges(round, 'A')}
			{@const teamB = teamBadges(round, 'B')}
			<div
				class="score-row flex items-center justify-between p-4 bg-primary rounded-lg relative text-primary-content"
				role="button"
				tabindex="0"
				on:click={() => handleRowClick(index)}
				on:keydown={(event) => handleRowKey(event, index)}
				on:touchstart={(event) => handleTouchStart(event, index)}
				on:touchend={(event) => handleTouchEnd(event, index)}
			>
				<div class="w-1/2 text-center font-medium">
					{teamA.points}
					<ScoreBadge type="success" show={teamA.flags.tichu} label={$t.gameControls.tichu} icon="T" />
					<ScoreBadge type="success" show={teamA.flags.grand} label={$t.gameControls.grandTichu} icon="GT" />
					<ScoreBadge type="error" show={teamA.flags.lostTichu} label={$t.gameControls.lostTichu} icon="LT" />
					<ScoreBadge
						type="error"
						show={teamA.flags.lostGrand}
						label={$t.gameControls.lostGrandTichu}
						icon="LGT"
					/>
					<ScoreBadge
						type="warning"
						show={teamA.flags.doubleWin}
						label={$t.gameControls.doubleWin}
						icon="DW"
					/>
				</div>
				<div class="w-1/2 text-center font-medium">
					{teamB.points}
					<ScoreBadge type="success" show={teamB.flags.tichu} label={$t.gameControls.tichu} icon="T" />
					<ScoreBadge type="success" show={teamB.flags.grand} label={$t.gameControls.grandTichu} icon="GT" />
					<ScoreBadge type="error" show={teamB.flags.lostTichu} label={$t.gameControls.lostTichu} icon="LT" />
					<ScoreBadge
						type="error"
						show={teamB.flags.lostGrand}
						label={$t.gameControls.lostGrandTichu}
						icon="LGT"
					/>
					<ScoreBadge
						type="warning"
						show={teamB.flags.doubleWin}
						label={$t.gameControls.doubleWin}
						icon="DW"
					/>
				</div>
				<button
					class={`delete-button absolute right-4 btn btn-error btn-sm text-error-content ${
						activeRowIndex === index ? 'delete-button--active' : ''
					}`}
					on:click|stopPropagation={() => deleteScore(index)}
					aria-label={$t.gameControls.delete}
					aria-hidden={activeRowIndex !== index}
					tabindex={activeRowIndex === index ? 0 : -1}
				>
					{$t.gameControls.delete}
				</button>
			</div>
		{/each}
	</div>
</div>

<style>
	.score-row {
		position: relative;
	}

	.delete-button {
		opacity: 0;
		transform: translateX(6px);
		pointer-events: none;
		transition: opacity 0.2s ease, transform 0.2s ease;
	}

	.delete-button--active {
		opacity: 1;
		transform: translateX(0);
		pointer-events: auto;
	}
</style>
