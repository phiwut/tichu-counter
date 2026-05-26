<script lang="ts">
	import { gameStatus } from '../lib/game-status';
	import { scoreStore, totals } from '../stores/score-store';
	import { settingsStore } from '../stores/settings-store';
	import { calculateTichuSuccess, countSpecialMoves } from '../lib/game-stats';
	import { resetRounds } from '../lib/game-actions';
	import { t } from '../lib/translations';
	import Modal from './Modal.svelte';

	let dismissed = false;

	$: if (!$gameStatus.isComplete) {
		dismissed = false;
	}

	$: show = $gameStatus.isComplete && !dismissed;

	function dismiss(): void {
		dismissed = true;
	}

	function startNewGame(): void {
		resetRounds();
		dismissed = false;
	}

	$: winnerLabel =
		$gameStatus.outcome === 'draw'
			? $t.gameComplete.draft
			: $gameStatus.outcome
				? $t.gameComplete.winner.replace('{winner}', $gameStatus.outcome.name)
				: '';
</script>

<Modal show={show} title={$t.gameComplete.title} onClose={dismiss}>
	<div slot="content" class="space-y-4">
		<div class="text-center text-2xl font-bold mb-6">{winnerLabel}</div>

		<div class="stats stats-vertical lg:stats-horizontal shadow w-full">
			<div class="stat">
				<div class="stat-title">{$t.gameComplete.totalGames}</div>
				<div class="stat-value text-primary">{$scoreStore.rounds.length}</div>
			</div>
			<div class="stat">
				<div class="stat-title">{$t.gameComplete.totalPoints}</div>
				<div class="stat-value text-primary">{$totals.totalA + $totals.totalB}</div>
			</div>
		</div>

		<div class="divider">{$t.gameComplete.teamStats}</div>

		<div class="stats stats-vertical shadow w-full">
			<div class="stat">
				<div class="stat-title">{$settingsStore.teamA}</div>
				<div class="stat-value text-primary">{$totals.totalA}</div>
				<div class="stat-desc">
					{$t.gameComplete.tichuSuccess}: {calculateTichuSuccess($scoreStore.rounds, 'A')}%
				</div>
			</div>
			<div class="stat">
				<div class="stat-title">{$settingsStore.teamB}</div>
				<div class="stat-value text-primary">{$totals.totalB}</div>
				<div class="stat-desc">
					{$t.gameComplete.tichuSuccess}: {calculateTichuSuccess($scoreStore.rounds, 'B')}%
				</div>
			</div>
		</div>

		<div class="divider">{$t.gameComplete.specialMoves}</div>

		<div class="grid grid-cols-2 gap-4">
			<div>
				<h3 class="font-bold mb-2">{$settingsStore.teamA}</h3>
				<ul class="space-y-2">
					<li>{$t.gameComplete.tichuLabel}: {countSpecialMoves($scoreStore.rounds, 'A', 'tichu')}</li>
					<li>{$t.gameComplete.grandTichuLabel}: {countSpecialMoves($scoreStore.rounds, 'A', 'grand')}</li>
					<li>{$t.gameComplete.doubleWinLabel}: {countSpecialMoves($scoreStore.rounds, 'A', 'doubleWin')}</li>
				</ul>
			</div>
			<div>
				<h3 class="font-bold mb-2">{$settingsStore.teamB}</h3>
				<ul class="space-y-2">
					<li>{$t.gameComplete.tichuLabel}: {countSpecialMoves($scoreStore.rounds, 'B', 'tichu')}</li>
					<li>{$t.gameComplete.grandTichuLabel}: {countSpecialMoves($scoreStore.rounds, 'B', 'grand')}</li>
					<li>{$t.gameComplete.doubleWinLabel}: {countSpecialMoves($scoreStore.rounds, 'B', 'doubleWin')}</li>
				</ul>
			</div>
		</div>
	</div>
	<div slot="actions">
		<button class="btn btn-primary" on:click={startNewGame}>{$t.gameComplete.newGame}</button>
		<button class="btn" on:click={dismiss}>{$t.gameComplete.close}</button>
	</div>
</Modal>
