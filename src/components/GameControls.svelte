<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { settingsStore } from '../stores/settings-store';
	import { emptyRoundInput } from '../stores/score-store';
	import { t } from '../lib/translations';
	import { clampTrickScore, computeRoundPoints, oppositeTrickScore, type RoundInput } from '../lib/scoring';
	import { addRound, resetRounds } from '../lib/game-actions';
	import InputField from './InputField.svelte';
	import Modal from './Modal.svelte';

	const dispatch = createEventDispatcher<{ openSettings: void }>();

	let scoreA: string | number = '';
	let scoreB: string | number = '';
	let flags = emptyRoundInput();
	let showResetModal = false;
	let isAddButtonDisabled = true;

	$: teamA = $settingsStore.teamA;
	$: teamB = $settingsStore.teamB;

	$: {
		const numericScoreA = Number(scoreA);
		const numericScoreB = Number(scoreB);
		const hasValidScores =
			scoreA !== '' &&
			scoreB !== '' &&
			Number.isFinite(numericScoreA) &&
			Number.isFinite(numericScoreB) &&
			numericScoreA % 5 === 0 &&
			numericScoreB % 5 === 0;

		isAddButtonDisabled = !(hasValidScores || flags.A.doubleWin || flags.B.doubleWin);
	}

	function validateAndSetScore(
		event: Event,
		setScore: (value: string | number) => void,
		setOppositeScore: (value: string | number) => void
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
			const clamped = clampTrickScore(intScore);
			setScore(clamped);
			setOppositeScore(oppositeTrickScore(clamped));
		} else {
			setScore(value);
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

	function handleCheckboxChange(event: Event, setValue: (value: boolean) => void): void {
		if (event.currentTarget instanceof HTMLInputElement) {
			setValue(event.currentTarget.checked);
		}
	}

	$: checkboxRows = [
		{
			id: 'tichu',
			label: $t.gameControls.tichuLabel,
			checkedA: flags.A.tichu,
			checkedB: flags.B.tichu,
			setA: (value: boolean) => (flags.A.tichu = value),
			setB: (value: boolean) => (flags.B.tichu = value),
			disabledA:
				flags.A.lostTichu ||
				flags.A.lostGrand ||
				flags.A.grand ||
				flags.B.tichu ||
				flags.B.grand ||
				flags.B.doubleWin,
			disabledB:
				flags.B.lostTichu ||
				flags.B.lostGrand ||
				flags.B.grand ||
				flags.A.tichu ||
				flags.A.grand ||
				flags.A.doubleWin
		},
		{
			id: 'lostTichu',
			label: $t.gameControls.lostTichuLabel,
			checkedA: flags.A.lostTichu,
			checkedB: flags.B.lostTichu,
			setA: (value: boolean) => (flags.A.lostTichu = value),
			setB: (value: boolean) => (flags.B.lostTichu = value),
			disabledA: flags.A.lostGrand || flags.A.tichu || flags.A.grand || flags.A.doubleWin,
			disabledB: flags.B.lostGrand || flags.B.tichu || flags.B.grand || flags.B.doubleWin
		},
		{
			id: 'grandTichu',
			label: $t.gameControls.grandTichuLabel,
			checkedA: flags.A.grand,
			checkedB: flags.B.grand,
			setA: (value: boolean) => (flags.A.grand = value),
			setB: (value: boolean) => (flags.B.grand = value),
			disabledA:
				flags.A.lostTichu ||
				flags.A.lostGrand ||
				flags.A.tichu ||
				flags.B.tichu ||
				flags.B.grand ||
				flags.B.doubleWin,
			disabledB:
				flags.B.lostTichu ||
				flags.B.lostGrand ||
				flags.B.tichu ||
				flags.A.tichu ||
				flags.A.grand ||
				flags.A.doubleWin
		},
		{
			id: 'lostGrandTichu',
			label: $t.gameControls.lostGrandTichuLabel,
			checkedA: flags.A.lostGrand,
			checkedB: flags.B.lostGrand,
			setA: (value: boolean) => (flags.A.lostGrand = value),
			setB: (value: boolean) => (flags.B.lostGrand = value),
			disabledA: flags.A.lostTichu || flags.A.tichu || flags.A.grand || flags.A.doubleWin,
			disabledB: flags.B.lostTichu || flags.B.tichu || flags.B.grand || flags.B.doubleWin
		},
		{
			id: 'doubleWin',
			label: $t.gameControls.doubleWinLabel,
			checkedA: flags.A.doubleWin,
			checkedB: flags.B.doubleWin,
			setA: (value: boolean) => (flags.A.doubleWin = value),
			setB: (value: boolean) => (flags.B.doubleWin = value),
			disabledA:
				flags.A.lostTichu ||
				flags.A.lostGrand ||
				flags.B.tichu ||
				flags.B.grand ||
				flags.B.doubleWin,
			disabledB:
				flags.B.lostTichu ||
				flags.B.lostGrand ||
				flags.A.tichu ||
				flags.A.grand ||
				flags.A.doubleWin
		}
	];
</script>

<div class="w-full px-5 my-4">
	<div class="w-full px-6 space-x-6 flex justify-between mb-4">
		<InputField
			bind:value={scoreA}
			on:input={(e) => validateAndSetScore(e, (val) => (scoreA = val), (val) => (scoreB = val))}
			label={teamA}
		/>
		<InputField
			bind:value={scoreB}
			on:input={(e) => validateAndSetScore(e, (val) => (scoreB = val), (val) => (scoreA = val))}
			label={teamB}
		/>
	</div>

	<table class="table table-sm w-full">
		<thead>
			<tr>
				<th></th>
				<th class="text-center">{teamA}</th>
				<th class="text-center">{teamB}</th>
			</tr>
		</thead>
		<tbody>
			{#each checkboxRows as row (row.id)}
				<tr>
					<td>{row.label}</td>
					<td class="text-center">
						<input
							type="checkbox"
							class="checkbox checkbox-primary"
							checked={row.checkedA}
							on:change={(event) => handleCheckboxChange(event, row.setA)}
							disabled={row.disabledA}
						/>
					</td>
					<td class="text-center">
						<input
							type="checkbox"
							class="checkbox checkbox-primary"
							checked={row.checkedB}
							on:change={(event) => handleCheckboxChange(event, row.setB)}
							disabled={row.disabledB}
						/>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<div class="w-full px-5 mb-6 flex items-center">
	<button
		class="btn btn-primary flex-grow mr-2 {isAddButtonDisabled ? 'btn-outline' : ''}"
		on:click={addScore}
		disabled={isAddButtonDisabled}
	>
		{$t.gameControls.addScore}
	</button>
	<button
		class="btn btn-info mr-2"
		on:click={() => dispatch('openSettings')}
		aria-label={$t.settings.title}
	>
		<img src="/settings.svg" alt={$t.settings.title} width="24" height="24" />
	</button>
	<button class="btn btn-error" on:click={() => (showResetModal = true)} aria-label={$t.gameControls.reset}>
		<img src="/trash.svg" alt={$t.gameControls.reset} width="24" height="24" />
	</button>
</div>

<Modal show={showResetModal} title={$t.gameControls.reset} onClose={() => (showResetModal = false)}>
	<p slot="content">{$t.gameControls.confirmReset}</p>
	<div slot="actions">
		<button class="btn" on:click={() => (showResetModal = false)}>{$t.gameControls.no}</button>
		<button class="btn btn-error" on:click={() => { resetRounds(); showResetModal = false; }}>
			{$t.gameControls.yes}
		</button>
	</div>
</Modal>
