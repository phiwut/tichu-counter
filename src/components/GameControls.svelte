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

<script>
	import { scoreStore } from "../stores/scoreStore";
	import { settingsStore } from "../stores/settingsStore";
	import { get } from "svelte/store";
	import { createEventDispatcher } from "svelte";
	import InputField from "./InputField.svelte";
	import Modal from "./Modal.svelte";
	import { t } from "../lib/translations";

	const dispatch = createEventDispatcher();

	// Local state variables
	let scoreA = "";
	let scoreB = "";
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

	// Settings from the store
	let teamA = "TEAM A";
	let teamB = "TEAM B";
	let gameLimit = 1000;

	// Subscribe to settings store to update local state
	settingsStore.subscribe((value) => {
		teamA = value.teamA;
		teamB = value.teamB;
		gameLimit = value.gameLimit;
	});

	// Reactive statement to enable/disable the add score button
	$: isAddButtonDisabled = !(
		(scoreA !== "" &&
			scoreB !== "" &&
			!isNaN(scoreA) &&
			!isNaN(scoreB) &&
			scoreA % 5 === 0 &&
			scoreB % 5 === 0) ||
		doubleWinA ||
		doubleWinB
	);

	// Utility functions

	/**
	 * Validates and sets the score for a team, updating the opposite team's score accordingly
	 * @param {Event} event - The input event
	 * @param {Function} setScore - Function to set the score for the current team
	 * @param {Function} setOppositeScore - Function to set the score for the opposite team
	 */
	function validateAndSetScore(event, setScore, setOppositeScore) {
		let value = event.target.value;
		if (value === "" || value === "-") {
			setScore(value);
			setOppositeScore("");
		} else {
			let intScore = parseInt(value);
			if (!isNaN(intScore) && intScore % 5 === 0) {
				intScore = Math.max(-25, Math.min(125, intScore));
				setScore(intScore);
				setOppositeScore(100 - intScore);
			} else {
				setScore(value);
				setOppositeScore("");
			}
		}
	}

	/**
	 * Checks if there's a winner based on the current scores and game limit
	 * @param {number} totalA - Total score for Team A
	 * @param {number} totalB - Total score for Team B
	 */
	function checkWinner(totalA, totalB) {
		let winner = "";
		if (totalA >= gameLimit && totalB >= gameLimit) {
			winner = "Draft";
		} else if (totalA >= gameLimit) {
			winner = teamA;
		} else if (totalB >= gameLimit) {
			winner = teamB;
		}

		if (winner) {
			settingsStore.update((store) => ({
				...store,
				showWinner: true,
				winner,
			}));
		}
	}

	/**
	 * Adds the current round's score to the scoreStore
	 */
	function addScore() {
		let { scores, totalA, totalB } = get(scoreStore);
		let newScoreA = parseInt(isNaN(scoreA) ? 0 : scoreA);
		let newScoreB = parseInt(isNaN(scoreB) ? 0 : scoreB);

		// Calculate new scores based on Tichu and Grand Tichu status
		if (doubleWinA) {
			newScoreA = 200;
			newScoreB = 0;
		}
		if (doubleWinB) {
			newScoreB = 200;
			newScoreA = 0;
		}

		if (tichuA) newScoreA += 100;
		if (tichuB) newScoreB += 100;
		if (grandA) newScoreA += 200;
		if (grandB) newScoreB += 200;
		if (lostTichuA) newScoreA -= 100;
		if (lostTichuB) newScoreB -= 100;
		if (lostGrandA) newScoreA -= 200;
		if (lostGrandB) newScoreB -= 200;

		// Update the scores and totals in the store
		scores.push({
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

		totalA += newScoreA;
		totalB += newScoreB;

		scoreStore.update((store) => ({
			...store,
			scores,
			totalA,
			totalB,
		}));

		// Reset local state
		resetInputs();

		// Check for a winner
		checkWinner(totalA, totalB);
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
		scoreStore.update(() => ({
			totalA: 0,
			totalB: 0,
			scores: [],
		}));
		showResetModal = false;
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
			<!-- Tichu option -->
			<tr>
				<td>{$t?.gameControls?.tichuLabel || "Tichu"}</td>
				<td class="text-center">
					<input
						type="checkbox"
						class="checkbox checkbox-primary"
						bind:checked={tichuA}
						disabled={lostTichuA ||
							lostGrandA ||
							grandA ||
							tichuB ||
							grandB ||
							doubleWinB}
					/>
				</td>
				<td class="text-center">
					<input
						type="checkbox"
						class="checkbox checkbox-primary"
						bind:checked={tichuB}
						disabled={lostTichuB ||
							lostGrandB ||
							grandB ||
							tichuA ||
							grandA ||
							doubleWinA}
					/>
				</td>
			</tr>
			<!-- Lost Tichu option -->
			<tr>
				<td>{$t?.gameControls?.lostTichuLabel || "Lost Tichu"}</td>
				<td class="text-center">
					<input
						type="checkbox"
						class="checkbox checkbox-primary"
						bind:checked={lostTichuA}
						disabled={lostGrandA || tichuA || grandA || doubleWinA}
					/>
				</td>
				<td class="text-center">
					<input
						type="checkbox"
						class="checkbox checkbox-primary"
						bind:checked={lostTichuB}
						disabled={lostGrandB || tichuB || grandB || doubleWinB}
					/>
				</td>
			</tr>
			<!-- Grand Tichu option -->
			<tr>
				<td>{$t?.gameControls?.grandTichuLabel || "Grand Tichu"}</td>
				<td class="text-center">
					<input
						type="checkbox"
						class="checkbox checkbox-primary"
						bind:checked={grandA}
						disabled={lostTichuA ||
							lostGrandA ||
							tichuA ||
							tichuB ||
							grandB ||
							doubleWinB}
					/>
				</td>
				<td class="text-center">
					<input
						type="checkbox"
						class="checkbox checkbox-primary"
						bind:checked={grandB}
						disabled={lostTichuB ||
							lostGrandB ||
							tichuB ||
							tichuA ||
							grandA ||
							doubleWinA}
					/>
				</td>
			</tr>
			<!-- Lost Grand Tichu option -->
			<tr>
				<td
					>{$t?.gameControls?.lostGrandTichuLabel ||
						"Lost Grand Tichu"}</td
				>
				<td class="text-center">
					<input
						type="checkbox"
						class="checkbox checkbox-primary"
						bind:checked={lostGrandA}
						disabled={lostTichuA || tichuA || grandA || doubleWinA}
					/>
				</td>
				<td class="text-center">
					<input
						type="checkbox"
						class="checkbox checkbox-primary"
						bind:checked={lostGrandB}
						disabled={lostTichuB || tichuB || grandB || doubleWinB}
					/>
				</td>
			</tr>
			<!-- Double Win option -->
			<tr>
				<td>{$t?.gameControls?.doubleWinLabel || "Double Win"}</td>
				<td class="text-center">
					<input
						type="checkbox"
						class="checkbox checkbox-primary"
						bind:checked={doubleWinA}
						disabled={lostTichuA ||
							lostGrandA ||
							tichuB ||
							grandB ||
							doubleWinB}
					/>
				</td>
				<td class="text-center">
					<input
						type="checkbox"
						class="checkbox checkbox-primary"
						bind:checked={doubleWinB}
						disabled={lostTichuB ||
							lostGrandB ||
							tichuA ||
							grandA ||
							doubleWinA}
					/>
				</td>
			</tr>
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
<Modal show={showResetModal} title={$t?.gameControls?.reset || "Reset"}>
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
