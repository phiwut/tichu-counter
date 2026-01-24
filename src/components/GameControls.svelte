<!--
  @component
  This component handles the game controls for a Tichu scoring application.
  It allows users to input scores, select various game options (Tichu, Grand Tichu, etc.),
  and manages the overall game state. The component interacts with the scoreStore and
  settingsStore to maintain and update the game's state.

  Features:
  - Score input for both teams
  - Tichu and Grand Tichu options (including lost Tichu/Grand Tichu)
  - Double Win option
  - Score validation and automatic opposite score calculation
  - Game reset functionality with confirmation modal
  - Settings access
-->

<script lang="ts">
	import { scoreStore } from "../stores/scoreStore";
	import { settingsStore } from "../stores/settingsStore";
	import { createEventDispatcher } from "svelte";
	import InputField from "./InputField.svelte";
	import Modal from "./Modal.svelte";
	import { t } from "../lib/translations";
	import {
		BASE_SCORE_TOTAL,
		DOUBLE_WIN_POINTS,
		GRAND_TICHU_BONUS,
		SCORE_BOUNDS,
		TICHU_BONUS,
	} from "../lib/constants";
	import { toastStore } from "../stores/toastStore";

	const dispatch = createEventDispatcher<{ openSettings: void }>();

	// Local state variables
	let scoreA: string | number = "";
	let scoreB: string | number = "";
	let tichuA = false;
	let tichuB = false;
	let grandA = false;
	let grandB = false;
	let lostTichuA = false;
	let lostTichuB = false;
	let lostGrandA = false;
	let lostGrandB = false;
	let doubleWinA = false;
	let doubleWinB = false;
	let showResetModal = false;
	let canUndo = false;
	let canRedo = false;
	let isAddButtonDisabled = true;

	// Settings from the store
	let teamA = "TEAM A";
	let teamB = "TEAM B";

	// Subscribe to settings store to update local state
	settingsStore.subscribe((value) => {
		teamA = value.teamA;
		teamB = value.teamB;
	});

	scoreStore.subscribe((value) => {
		canUndo = value.past.length > 0;
		canRedo = value.future.length > 0;
	});

	// Reactive statement to enable/disable the add score button
	$: {
		const numericScoreA = Number(scoreA);
		const numericScoreB = Number(scoreB);
		const hasValidScores =
			scoreA !== "" &&
			scoreB !== "" &&
			Number.isFinite(numericScoreA) &&
			Number.isFinite(numericScoreB) &&
			numericScoreA % 5 === 0 &&
			numericScoreB % 5 === 0;

		isAddButtonDisabled = !(hasValidScores || doubleWinA || doubleWinB);
	}

	// Utility functions

	/**
	 * Validates and sets the score for a team, updating the opposite team's score accordingly
	 * @param {Event} event - The input event
	 * @param {Function} setScore - Function to set the score for the current team
	 * @param {Function} setOppositeScore - Function to set the score for the opposite team
	 */
	function validateAndSetScore(
		event: Event,
		setScore: (value: string | number) => void,
		setOppositeScore: (value: string | number) => void,
	) {
		const target = event.target as HTMLInputElement;
		let value = target.value;
		if (value === "" || value === "-") {
			setScore(value);
			setOppositeScore("");
		} else {
			let intScore = parseInt(value);
			if (!isNaN(intScore) && intScore % 5 === 0) {
				intScore = Math.max(
					SCORE_BOUNDS.MIN,
					Math.min(SCORE_BOUNDS.MAX, intScore),
				);
				setScore(intScore);
				setOppositeScore(BASE_SCORE_TOTAL - intScore);
			} else {
				setScore(value);
				setOppositeScore("");
			}
		}
	}

	/**
	 * Adds the current round's score to the scoreStore
	 */
	function addScore() {
		const parsedScoreA = Number(scoreA);
		const parsedScoreB = Number(scoreB);
		let newScoreA = Number.isFinite(parsedScoreA) ? parsedScoreA : 0;
		let newScoreB = Number.isFinite(parsedScoreB) ? parsedScoreB : 0;

		// Calculate new scores based on Tichu and Grand Tichu status
		if (doubleWinA) {
			newScoreA = DOUBLE_WIN_POINTS;
			newScoreB = 0;
		}
		if (doubleWinB) {
			newScoreB = DOUBLE_WIN_POINTS;
			newScoreA = 0;
		}

		if (tichuA) newScoreA += TICHU_BONUS;
		if (tichuB) newScoreB += TICHU_BONUS;
		if (grandA) newScoreA += GRAND_TICHU_BONUS;
		if (grandB) newScoreB += GRAND_TICHU_BONUS;
		if (lostTichuA) newScoreA -= TICHU_BONUS;
		if (lostTichuB) newScoreB -= TICHU_BONUS;
		if (lostGrandA) newScoreA -= GRAND_TICHU_BONUS;
		if (lostGrandB) newScoreB -= GRAND_TICHU_BONUS;

		scoreStore.addScoreEntry({
			teamA: newScoreA,
			teamB: newScoreB,
			tichuA,
			tichuB,
			grandA,
			grandB,
			lostTichuA,
			lostTichuB,
			lostGrandA,
			lostGrandB,
			doubleWinA,
			doubleWinB,
		});

		// Reset local state
		resetInputs();
		toastStore.addToast(
			$t?.toast?.scoreAdded || "Score added successfully.",
			{ type: "success" },
		);
	}

	/**
	 * Resets all input fields and checkboxes to their default states
	 */
	function resetInputs() {
		scoreA = "";
		scoreB = "";
		tichuA = false;
		tichuB = false;
		grandA = false;
		grandB = false;
		lostTichuA = false;
		lostTichuB = false;
		lostGrandA = false;
		lostGrandB = false;
		doubleWinA = false;
		doubleWinB = false;
	}

	/**
	 * Displays the reset confirmation modal
	 */
	function handleReset() {
		showResetModal = true;
	}

	/**
	 * Resets the game scores and closes the reset confirmation modal
	 */
	function confirmReset() {
		scoreStore.resetScores();
		showResetModal = false;
		toastStore.addToast(
			$t?.toast?.gameReset || "Game reset.",
			{ type: "info" },
		);
	}

	/**
	 * Closes the reset confirmation modal without resetting the game
	 */
	function closeResetModal() {
		showResetModal = false;
	}

	/**
	 * Dispatches an event to open the settings modal
	 */
	function openSettingsModal() {
		dispatch("openSettings");
	}

	function handleCheckboxChange(
		event: Event,
		setValue: (value: boolean) => void,
	) {
		if (event.currentTarget instanceof HTMLInputElement) {
			setValue(event.currentTarget.checked);
		}
	}

	const checkboxRows = [
		{
			id: "tichu",
			label: () => $t?.gameControls?.tichuLabel || "Tichu",
			checkedA: () => tichuA,
			checkedB: () => tichuB,
			setA: (value) => (tichuA = value),
			setB: (value) => (tichuB = value),
			disabledA: () =>
				lostTichuA ||
				lostGrandA ||
				grandA ||
				tichuB ||
				grandB ||
				doubleWinB,
			disabledB: () =>
				lostTichuB ||
				lostGrandB ||
				grandB ||
				tichuA ||
				grandA ||
				doubleWinA,
		},
		{
			id: "lostTichu",
			label: () => $t?.gameControls?.lostTichuLabel || "Lost Tichu",
			checkedA: () => lostTichuA,
			checkedB: () => lostTichuB,
			setA: (value) => (lostTichuA = value),
			setB: (value) => (lostTichuB = value),
			disabledA: () => lostGrandA || tichuA || grandA || doubleWinA,
			disabledB: () => lostGrandB || tichuB || grandB || doubleWinB,
		},
		{
			id: "grandTichu",
			label: () => $t?.gameControls?.grandTichuLabel || "Grand Tichu",
			checkedA: () => grandA,
			checkedB: () => grandB,
			setA: (value) => (grandA = value),
			setB: (value) => (grandB = value),
			disabledA: () =>
				lostTichuA ||
				lostGrandA ||
				tichuA ||
				tichuB ||
				grandB ||
				doubleWinB,
			disabledB: () =>
				lostTichuB ||
				lostGrandB ||
				tichuB ||
				tichuA ||
				grandA ||
				doubleWinA,
		},
		{
			id: "lostGrandTichu",
			label: () =>
				$t?.gameControls?.lostGrandTichuLabel || "Lost Grand Tichu",
			checkedA: () => lostGrandA,
			checkedB: () => lostGrandB,
			setA: (value) => (lostGrandA = value),
			setB: (value) => (lostGrandB = value),
			disabledA: () => lostTichuA || tichuA || grandA || doubleWinA,
			disabledB: () => lostTichuB || tichuB || grandB || doubleWinB,
		},
		{
			id: "doubleWin",
			label: () => $t?.gameControls?.doubleWinLabel || "Double Win",
			checkedA: () => doubleWinA,
			checkedB: () => doubleWinB,
			setA: (value) => (doubleWinA = value),
			setB: (value) => (doubleWinB = value),
			disabledA: () =>
				lostTichuA ||
				lostGrandA ||
				tichuB ||
				grandB ||
				doubleWinB,
			disabledB: () =>
				lostTichuB ||
				lostGrandB ||
				tichuA ||
				grandA ||
				doubleWinA,
		},
	];
</script>

<!-- HTML content -->
<div class="w-full px-5 my-4">
	<!-- Input fields for scores -->
	<div class="w-full px-6 space-x-6 flex justify-between mb-4">
		<InputField
			value={scoreA}
			placeholder={$t?.gameControls?.scoreInputHelper || "Enter score"}
			onInput={(event) =>
				validateAndSetScore(
					event,
					(val) => (scoreA = val),
					(val) => (scoreB = val),
				)}
		/>
		<InputField
			value={scoreB}
			placeholder={$t?.gameControls?.scoreInputHelper || "Enter score"}
			onInput={(event) =>
				validateAndSetScore(
					event,
					(val) => (scoreB = val),
					(val) => (scoreA = val),
				)}
		/>
	</div>
	<!-- Score options table -->
	<table class="table table-sm w-full">
		<thead>
			<tr>
				<th></th>
				<th class="text-center">{teamA}</th>
				<th class="text-center">{teamB}</th>
			</tr>
		</thead>
		<tbody>
			{#each checkboxRows as row}
				<tr>
					<td>{row.label()}</td>
					<td class="text-center">
						<input
							type="checkbox"
							class="checkbox checkbox-primary"
							checked={row.checkedA()}
							on:change={(event) =>
								handleCheckboxChange(event, row.setA)}
							disabled={row.disabledA()}
						/>
					</td>
					<td class="text-center">
						<input
							type="checkbox"
							class="checkbox checkbox-primary"
							checked={row.checkedB()}
							on:change={(event) =>
								handleCheckboxChange(event, row.setB)}
							disabled={row.disabledB()}
						/>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<!-- Action buttons -->
<div class="w-full px-5 mb-6 flex items-center">
	<button
		class="btn btn-primary mr-2 flex-grow {isAddButtonDisabled
			? 'btn-outline'
			: ''}"
		on:click={addScore}
		disabled={isAddButtonDisabled}
	>
		{$t?.gameControls?.addScore || "Add Score"}
	</button>

	<button
		class="btn btn-outline mr-2"
		on:click={() => {
			scoreStore.undo();
			toastStore.addToast(
				$t?.toast?.undo || "Undid last action.",
				{ type: "info" },
			);
		}}
		disabled={!canUndo}
	>
		{$t?.gameControls?.undo || "Undo"}
	</button>
	<button
		class="btn btn-outline mr-2"
		on:click={() => {
			scoreStore.redo();
			toastStore.addToast(
				$t?.toast?.redo || "Redid last action.",
				{ type: "info" },
			);
		}}
		disabled={!canRedo}
	>
		{$t?.gameControls?.redo || "Redo"}
	</button>

	<button
		class="btn btn-info mr-2"
		on:click={openSettingsModal}
		aria-label={$t?.settings?.title || "Settings"}
	>
		<img
			src="/settings.svg"
			alt={$t?.settings?.title || "Settings"}
			width="24"
			height="24"
		/>
	</button>
	<button
		class="btn btn-error"
		on:click={handleReset}
		aria-label={$t?.gameControls?.reset || "Reset"}
	>
		<img
			src="/trash.svg"
			alt={$t?.gameControls?.reset || "Reset"}
			width="24"
			height="24"
		/>
	</button>
</div>

<!-- Reset confirmation modal -->
<Modal
	show={showResetModal}
	title={$t?.gameControls?.reset || "Reset"}
	onClose={closeResetModal}
>
	<p slot="content">
		{$t?.gameControls?.confirmReset ||
			"Are you sure you want to reset the scores?"}
	</p>
	<div slot="actions">
		<button class="btn" on:click={closeResetModal}
			>{$t?.gameControls?.no || "No"}</button
		>
		<button class="btn btn-error" on:click={confirmReset}
			>{$t?.gameControls?.yes || "Yes"}</button
		>
	</div>
</Modal>
