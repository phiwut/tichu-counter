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
	let gameLimit = 500;

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
</script>

<div class="w-full px-10 my-4">
	<div class="w-full border-b border-gray-600 my-4"></div>
	<div class="w-full px-10 flex justify-between mb-4">
		<input
			type="number"
			placeholder="Score"
			class="input input-bordered input-primary w-1/2 text-center bg-gray-800 text-white mr-2"
			bind:value={scoreA}
			on:input={validateAndSetScoreA}
		/>
		<input
			type="number"
			placeholder="Score"
			class="input input-bordered input-primary w-1/2 text-center bg-gray-800 text-white ml-2"
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
				<td>Tichu:</td>
				<td class="text-center">
					<input
						type="checkbox"
						class="checkbox checkbox-primary"
						bind:checked={tichuA}
					/>
				</td>
				<td class="text-center">
					<input
						type="checkbox"
						class="checkbox checkbox-primary"
						bind:checked={tichuB}
					/>
				</td>
			</tr>
			<tr>
				<td>Lost Tichu:</td>
				<td class="text-center">
					<input
						type="checkbox"
						class="checkbox checkbox-primary"
						bind:checked={lostTichuA}
					/>
				</td>
				<td class="text-center">
					<input
						type="checkbox"
						class="checkbox checkbox-primary"
						bind:checked={lostTichuB}
					/>
				</td>
			</tr>
			<tr>
				<td>Grand:</td>
				<td class="text-center">
					<input
						type="checkbox"
						class="checkbox checkbox-primary"
						bind:checked={grandA}
					/>
				</td>
				<td class="text-center">
					<input
						type="checkbox"
						class="checkbox checkbox-primary"
						bind:checked={grandB}
					/>
				</td>
			</tr>
			<tr>
				<td>Lost Grand:</td>
				<td class="text-center">
					<input
						type="checkbox"
						class="checkbox checkbox-primary"
						bind:checked={lostGrandA}
					/>
				</td>
				<td class="text-center">
					<input
						type="checkbox"
						class="checkbox checkbox-primary"
						bind:checked={lostGrandB}
					/>
				</td>
			</tr>
			<tr>
				<td>Double:</td>
				<td class="text-center">
					<input
						type="checkbox"
						class="checkbox checkbox-primary"
						bind:checked={doubleWinA}
					/>
				</td>
				<td class="text-center">
					<input
						type="checkbox"
						class="checkbox checkbox-primary"
						bind:checked={doubleWinB}
					/>
				</td>
			</tr>
		</tbody>
	</table>
</div>
<div class="w-full px-10 mb-6">
	<button
		class="btn btn-primary w-full"
		on:click={addScore}
		disabled={isAddButtonDisabled}>Add Score</button
	>
</div>
