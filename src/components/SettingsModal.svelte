<script>
	import { settingsStore } from "../stores/settingsStore";
	import { onMount } from "svelte";

	let teamA = "TEAM A";
	let teamB = "TEAM B";
	let gameLimit = 1000; // Default value

	let showWinner = false;
	let winner = "";

	settingsStore.subscribe((value) => {
		teamA = value.teamA;
		teamB = value.teamB;
		gameLimit = value.gameLimit;
		showWinner = value.showWinner;
		winner = value.winner;
	});

	function saveSettings() {
		settingsStore.update((store) => ({
			...store,
			teamA,
			teamB,
			gameLimit,
		}));
		document.getElementById("settings-modal").close();
	}

	function resetWinner() {
		settingsStore.update((store) => ({
			...store,
			showWinner: false,
			winner: "",
		}));
		document.getElementById("winner-modal").close();
	}

	onMount(() => {
		if (showWinner) {
			document.getElementById("winner-modal").showModal();
		}
	});
</script>

<dialog id="settings-modal" class="modal">
	<div class="modal-box">
		<h2 class="font-bold text-xl">Settings</h2>
		<div class="form-control">
			<label class="label" for="teamA">
				<span class="label-text">Team A Name</span>
			</label>
			<input
				type="text"
				id="teamA"
				class="input input-bordered"
				bind:value={teamA}
			/>
		</div>
		<div class="form-control mt-4">
			<label class="label" for="teamB">
				<span class="label-text">Team B Name</span>
			</label>
			<input
				type="text"
				id="teamB"
				class="input input-bordered"
				bind:value={teamB}
			/>
		</div>
		<div class="form-control mt-4">
			<label class="label" for="gameLimit">
				<span class="label-text">Game Limit</span>
			</label>
			<select
				id="gameLimit"
				class="select select-bordered"
				bind:value={gameLimit}
			>
				<option value="500">500</option>
				<option value="1000">1000</option>
			</select>
		</div>
		<div class="modal-action">
			<button
				class="btn"
				onclick="document.getElementById('settings-modal').close();"
				>Close</button
			>
			<button class="btn btn-primary" on:click={saveSettings}>Save</button
			>
		</div>
	</div>
</dialog>

<dialog id="winner-modal" class="modal">
	<div class="modal-box">
		<h2 class="font-bold text-xl">Game Over</h2>
		<p>
			{winner === "Draft"
				? "The game is a draft!"
				: `The winner is ${winner}!`}
		</p>
		<div class="modal-action">
			<button class="btn" on:click={resetWinner}>OK</button>
		</div>
	</div>
</dialog>
