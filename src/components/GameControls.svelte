<script>
	import { scoreStore } from "../stores/scoreStore";
	import { settingsStore } from "../stores/settingsStore";
	import { get } from "svelte/store";

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
	let isAddButtonDisabled = true;

	let teamA = "TEAM A";
	let teamB = "TEAM B";
	let gameLimit = 1000;

	let showResetModal = false;

	settingsStore.subscribe((value) => {
		teamA = value.teamA;
		teamB = value.teamB;
		gameLimit = value.gameLimit;
	});

	$: {
		isAddButtonDisabled = !(
			(scoreA !== "" &&
				scoreB !== "" &&
				!isNaN(scoreA) &&
				!isNaN(scoreB) &&
				scoreA % 5 === 0 &&
				scoreB % 5 === 0) ||
			doubleWinA === true ||
			doubleWinB === true
		);
	}

	function validateAndSetScoreA(event) {
		let value = event.target.value;
		if (value === "" || value === "-") {
			scoreA = value;
			scoreB = "";
		} else {
			let intScoreA = parseInt(value);
			if (!isNaN(intScoreA) && intScoreA % 5 === 0) {
				if (intScoreA < -25) intScoreA = -25;
				if (intScoreA > 125) intScoreA = 125;
				scoreA = intScoreA;
				scoreB = 100 - intScoreA;
			} else {
				scoreA = value;
				scoreB = "";
			}
		}
	}

	function validateAndSetScoreB(event) {
		let value = event.target.value;
		if (value === "" || value === "-") {
			scoreB = value;
			scoreA = "";
		} else {
			let intScoreB = parseInt(value);
			if (!isNaN(intScoreB) && intScoreB % 5 === 0) {
				if (intScoreB < -25) intScoreB = -25;
				if (intScoreB > 125) intScoreB = 125;
				scoreB = intScoreB;
				scoreA = 100 - intScoreB;
			} else {
				scoreB = value;
				scoreA = "";
			}
		}
	}

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

	function addScore() {
		let currentScores = get(scoreStore).scores;
		let totalA = get(scoreStore).totalA;
		let totalB = get(scoreStore).totalB;

		let newScoreA = parseInt(isNaN(scoreA) ? 0 : scoreA);
		let newScoreB = parseInt(isNaN(scoreB) ? 0 : scoreB);

		if (tichuA) newScoreA += 100;
		if (tichuB) newScoreB += 100;
		if (grandA) newScoreA += 200;
		if (grandB) newScoreB += 200;
		if (lostTichuA) newScoreA -= 100;
		if (lostTichuB) newScoreB -= 100;
		if (lostGrandA) newScoreA -= 200;
		if (lostGrandB) newScoreB -= 200;

		if (doubleWinA) {
			newScoreA = 200;
			newScoreB = 0;
		}
		if (doubleWinB) {
			newScoreB = 200;
			newScoreA = 0;
		}

		currentScores.push({
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
			scores: currentScores,
			totalA: totalA,
			totalB: totalB,
		}));

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

		checkWinner(totalA, totalB);
	}

	function handleReset() {
		showResetModal = true;
	}

	function confirmReset() {
		scoreStore.update(() => ({
			totalA: 0,
			totalB: 0,
			scores: [],
		}));
		showResetModal = false;
	}

	function closeResetModal() {
		showResetModal = false;
	}

	function openSettingsModal() {
		document.getElementById("settings-modal").showModal();
	}
</script>

<div class="w-full px-5 my-4">
	<div class="w-full px-10 flex justify-between mb-4">
		<input
			type="number"
			pattern="[0-9]*"
			placeholder="Score"
			class="input input-bordered input-primary w-1/2 text-center mr-8"
			bind:value={scoreA}
			on:input={validateAndSetScoreA}
		/>
		<input
			type="number"
			pattern="[0-9]*"
			placeholder="Score"
			class="input input-bordered input-primary w-1/2 text-center ml-8"
			bind:value={scoreB}
			on:input={validateAndSetScoreB}
		/>
	</div>
	<table class="table w-full text-white">
		<thead>
			<tr>
				<th></th>
				<th class="text-center">{teamA}</th>
				<th class="text-center">{teamB}</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>Tichu</td>
				<td class="text-center">
					<input
						type="checkbox"
						class="checkbox checkbox-primary"
						bind:checked={tichuA}
						disabled={grandA || tichuB || grandB || doubleWinB}
					/>
				</td>
				<td class="text-center">
					<input
						type="checkbox"
						class="checkbox checkbox-primary"
						bind:checked={tichuB}
						disabled={grandB || tichuA || grandA || doubleWinA}
					/>
				</td>
			</tr>
			<tr>
				<td>Lost Tichu</td>
				<td class="text-center">
					<input
						type="checkbox"
						class="checkbox checkbox-primary"
						bind:checked={lostTichuA}
						disabled={tichuA || grandA || doubleWinA}
					/>
				</td>
				<td class="text-center">
					<input
						type="checkbox"
						class="checkbox checkbox-primary"
						bind:checked={lostTichuB}
						disabled={tichuB || grandB || doubleWinB}
					/>
				</td>
			</tr>
			<tr>
				<td>Grand Tichu</td>
				<td class="text-center">
					<input
						type="checkbox"
						class="checkbox checkbox-primary"
						bind:checked={grandA}
						disabled={tichuA || tichuB || grandB || doubleWinB}
					/>
				</td>
				<td class="text-center">
					<input
						type="checkbox"
						class="checkbox checkbox-primary"
						bind:checked={grandB}
						disabled={tichuB || tichuA || grandA || doubleWinA}
					/>
				</td>
			</tr>
			<tr>
				<td>Lost Grand Tichu</td>
				<td class="text-center">
					<input
						type="checkbox"
						class="checkbox checkbox-primary"
						bind:checked={lostGrandA}
						disabled={tichuA || grandA || doubleWinA}
					/>
				</td>
				<td class="text-center">
					<input
						type="checkbox"
						class="checkbox checkbox-primary"
						bind:checked={lostGrandB}
						disabled={tichuB || grandB || doubleWinB}
					/>
				</td>
			</tr>
			<tr>
				<td>Double Win</td>
				<td class="text-center">
					<input
						type="checkbox"
						class="checkbox checkbox-primary"
						bind:checked={doubleWinA}
						disabled={tichuB || grandB || doubleWinB}
						on:change={() => {
							if (doubleWinA) {
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
							}
						}}
					/>
				</td>
				<td class="text-center">
					<input
						type="checkbox"
						class="checkbox checkbox-primary"
						bind:checked={doubleWinB}
						disabled={tichuA || grandA || doubleWinA}
						on:change={() => {
							if (doubleWinB) {
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
							}
						}}
					/>
				</td>
			</tr>
		</tbody>
	</table>
</div>
<div class="w-full px-5 mb-6 flex items-center">
	<button
		class="btn btn-primary mr-2 flex-grow"
		on:click={addScore}
		disabled={isAddButtonDisabled}
	>
		Add Score
	</button>
	<button class="btn btn-natural mr-2" on:click={openSettingsModal}>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="feather feather-settings"
			><circle cx="12" cy="12" r="3"></circle><path
				d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"
			></path></svg
		>
	</button>
	<button class="btn btn-error" on:click={handleReset}>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="feather feather-trash"
			><polyline points="3 6 5 6 21 6"></polyline><path
				d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
			></path></svg
		>
	</button>
</div>

{#if showResetModal}
	<dialog class="modal" open>
		<div class="modal-box">
			<h2 class="font-bold text-xl">Confirm Reset</h2>
			<p>Are you sure you want to reset the scores?</p>
			<div class="modal-action">
				<button class="btn" on:click={closeResetModal}>No</button>
				<button class="btn btn-error" on:click={confirmReset}
					>Yes</button
				>
			</div>
		</div>
	</dialog>
{/if}
