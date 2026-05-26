<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { settingsStore } from '../stores/settings-store';
	import { emptyRoundInput } from '../stores/score-store';
	import { t } from '../lib/translations';
	import { computeRoundPoints, type RoundInput } from '../lib/scoring';
	import { addRound, resetRounds } from '../lib/game-actions';
	import InputField from './InputField.svelte';
	import Modal from './Modal.svelte';
	import TeamRoundOptions from './TeamRoundOptions.svelte';

	const dispatch = createEventDispatcher<{ 'open-settings': void }>();

	let scoreA = '';
	let scoreB = '';
	let flags = emptyRoundInput();
	let showResetModal = false;

	$: isAddButtonDisabled =
		!(
			scoreA !== '' &&
			scoreB !== '' &&
			Number.isInteger(Number(scoreA)) &&
			Number.isInteger(Number(scoreB)) &&
			Number(scoreA) % 5 === 0 &&
			Number(scoreB) % 5 === 0
		) || flags.A.doubleWin || flags.B.doubleWin;

	function validateAndSetScore(
		event: Event,
		setScore: (value: string) => void,
		setOppositeScore: (value: string) => void
	): void {
		const target = event.currentTarget as HTMLInputElement;
		const value = target.value;

		if (value === '' || value === '-') {
			setScore(value);
			setOppositeScore('');
			return;
		}

		const intScore = parseInt(value, 10);
		if (!isNaN(intScore) && intScore % 5 === 0) {
			const clamped = Math.max(-25, Math.min(125, intScore));
			setScore(clamped.toString());
			setOppositeScore((100 - clamped).toString());
		} else {
			setScore('');
			setOppositeScore('');
		}
	}

	function resetInputs(): void {
		scoreA = '';
		scoreB = '';
		flags = emptyRoundInput();
	}

	function addScore(): void {
		const input: RoundInput = {
			baseA: Number(scoreA) || 0,
			baseB: Number(scoreB) || 0,
			flags
		};
		addRound(computeRoundPoints(input));
		resetInputs();
	}

	function confirmReset(): void {
		resetRounds();
		showResetModal = false;
	}

	function openSettings(): void {
		dispatch('open-settings');
	}
</script>

<div class="w-full px-5 my-4">
	<div class="w-full px-6 space-x-6 flex justify-between mb-4">
		<InputField
			bind:value={scoreA}
			on:input={(e) => validateAndSetScore(e, (val) => (scoreA = val), (val) => (scoreB = val))}
			label={$settingsStore.teamA}
		/>
		<InputField
			bind:value={scoreB}
			on:input={(e) => validateAndSetScore(e, (val) => (scoreB = val), (val) => (scoreA = val))}
			label={$settingsStore.teamB}
		/>
	</div>

	<div class="w-full px-6 space-x-6 flex justify-between mb-4">
		<TeamRoundOptions bind:flags={flags.A} />
		<TeamRoundOptions bind:flags={flags.B} />
	</div>

	<div class="w-full px-6 space-x-2 flex justify-end">
		<button class="btn btn-primary" on:click={addScore} disabled={isAddButtonDisabled}>
			{$t.gameControls.addScore}
		</button>
		<button class="btn btn-secondary" on:click={() => (showResetModal = true)}>
			{$t.gameControls.reset}
		</button>
		<button class="btn btn-accent" on:click={openSettings}>
			{$t.settings.title}
		</button>
	</div>
</div>

<Modal show={showResetModal} title={$t.gameControls.confirmReset}>
	<p slot="content">{$t.gameControls.confirmReset}</p>
	<div slot="actions" class="space-x-2">
		<button class="btn btn-secondary" on:click={() => (showResetModal = false)}>
			{$t.gameControls.no}
		</button>
		<button class="btn btn-error" on:click={confirmReset}>{$t.gameControls.yes}</button>
	</div>
</Modal>
