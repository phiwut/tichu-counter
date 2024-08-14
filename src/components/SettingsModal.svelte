<script>
	import { settingsStore } from "../stores/settingsStore";
	import { onMount } from "svelte";
	import Modal from "./Modal.svelte";

	export let show = false;
	export let onClose;

	let teamA = "TEAM A";
	let teamB = "TEAM B";
	let gameLimit = 1000; // Default value

	let showWinner = false;
	let winner = "";

	let activeTab = "game"; // Track the active tab

	// Subscribe to settings store to update local state
	settingsStore.subscribe((value) => {
		teamA = value.teamA;
		teamB = value.teamB;
		gameLimit = value.gameLimit;
		showWinner = value.showWinner;
		winner = value.winner;
	});

	// Function to save settings
	function saveSettings() {
		settingsStore.update((store) => ({
			...store,
			teamA,
			teamB,
			gameLimit,
		}));
		onClose();
	}

	// Function to reset winner status
	function resetWinner() {
		settingsStore.update((store) => ({
			...store,
			showWinner: false,
			winner: "",
		}));
	}

	// Function to change theme
	function changeTheme(theme) {
		document.documentElement.setAttribute("data-theme", theme);
	}

	// Function to handle key events for tab navigation
	function handleTabKey(event, tab) {
		if (event.key === "Enter" || event.key === " ") {
			event.preventDefault();
			activeTab = tab;
		}
	}
</script>

<Modal {show} title="Settings" on:close={onClose}>
	<div slot="content">
		<div role="tablist" class="tabs tabs-bordered">
			<a
				role="tab"
				tabindex="0"
				class={`tab ${activeTab === "game" ? "tab-active" : ""}`}
				on:click={() => (activeTab = "game")}
				on:keydown={(event) => handleTabKey(event, "game")}>Game</a
			>
			<a
				role="tab"
				tabindex="0"
				class={`tab ${activeTab === "app" ? "tab-active" : ""}`}
				on:click={() => (activeTab = "app")}
				on:keydown={(event) => handleTabKey(event, "app")}>App</a
			>
			<a
				role="tab"
				tabindex="0"
				class={`tab ${activeTab === "info" ? "tab-active" : ""}`}
				on:click={() => (activeTab = "info")}
				on:keydown={(event) => handleTabKey(event, "info")}>Info</a
			>
		</div>
		<div class="mt-4">
			{#if activeTab === "game"}
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
					<input
						type="number"
						id="gameLimit"
						class="input input-bordered"
						bind:value={gameLimit}
						min="1"
					/>
				</div>
			{:else if activeTab === "app"}
				<div class="form-control">
					<label class="label" for="themeSelector">
						<span class="label-text">App Theme</span>
					</label>
					<select
						id="themeSelector"
						class="select select-bordered"
						on:change={(event) => changeTheme(event.target.value)}
					>
						<option value="light">Light</option>
						<option value="dark">Dark</option>
						<option value="bumblebee">Bumblebee</option>
						<option value="synthwave">Synthwave</option>
						<option value="valentine">Valentine</option>
						<option value="halloween">Halloween</option>
						<option value="garden">Garden</option>
						<option value="forest">Forest</option>
						<option value="fantasy">Fantasy</option>
						<option value="luxury">Luxury</option>
						<option value="dracula">Dracula</option>
						<option value="autumn">Autumn</option>
						<option value="night">Night</option>
						<option value="coffee">Coffee</option>
						<option value="dim">Dim</option>
						<option value="nord">Nord</option>
						<option value="sunset">Sunset</option>
					</select>
				</div>
			{:else if activeTab === "info"}
				<p class="text-base">
					This application is designed to help you manage your game
					settings efficiently. For more information, visit our
					website.
				</p>
			{/if}
		</div>
	</div>
	<div slot="actions">
		<button class="btn" on:click={onClose}>Close</button>
		<button class="btn btn-primary" on:click={saveSettings}>Save</button>
	</div>
</Modal>

<Modal show={showWinner} title="Game Complete">
	<p slot="content">
		{winner === "Draft"
			? "The game is a draft!"
			: `The winner is ${winner}!`}
	</p>
	<div slot="actions">
		<button class="btn" on:click={resetWinner}>OK</button>
	</div>
</Modal>
