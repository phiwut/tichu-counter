<!--
  @component
  This component represents the settings modal for the Tichu scoring application.
  It allows users to modify game settings, change the app theme, and view information about the app.
  The component also handles displaying the winner when a game is complete.

  Props:
  - show: A boolean to control the visibility of the settings modal
  - onClose: A function to be called when the modal is closed

  Features:
  - Tabbed interface for different setting categories (Game, App, Info)
  - Game settings: Team names and game limit
  - App settings: Theme selection
  - Info tab with general information about the app
  - Displays game winner in a separate modal when a game is complete
  - Keyboard accessible for better usability
-->

<script>
	import { settingsStore } from "../stores/settingsStore";
	import { languageStore } from "../stores/languageStore";
	import { scoreStore } from "../stores/scoreStore";
	import { t } from "../lib/translations";
	import { get } from "svelte/store";
	import { onMount } from "svelte";
	import Modal from "./Modal.svelte";

	export let show = false;
	export let onClose;

	let showWinner = false;
	let winner = null;
	let scores = [];
	let totalA = 0;
	let totalB = 0;

	let activeTab = "game";
	let teamA;
	let teamB;
	let gameLimit;

	onMount(() => {
		const settings = get(settingsStore);
		teamA = settings.teamA;
		teamB = settings.teamB;
		gameLimit = settings.gameLimit;
	});

	scoreStore.subscribe((value) => {
		scores = value.scores;
		totalA = value.totalA;
		totalB = value.totalB;

		if (gameLimit && (totalA >= gameLimit || totalB >= gameLimit)) {
			showWinner = true;
			if (totalA === totalB) {
				winner = "Draft";
			} else {
				winner = totalA > totalB ? teamA : teamB;
			}
		}
	});

	function handleTabKey(event, tab) {
		if (event.key === "Enter" || event.key === " ") {
			activeTab = tab;
		}
	}

	function resetWinner() {
		showWinner = false;
		winner = null;
		scoreStore.update((store) => ({
			...store,
			scores: [],
			totalA: 0,
			totalB: 0,
		}));
	}

	function changeTheme(theme) {
		document.documentElement.setAttribute("data-theme", theme);
	}

	function calculateTichuSuccess(scores, team) {
		const tichuAttempts = scores.filter(
			(score) => score[`tichu${team}`] || score[`grand${team}`],
		).length;

		const tichuSuccesses = scores.filter(
			(score) =>
				(score[`tichu${team}`] && !score[`lostTichu${team}`]) ||
				(score[`grand${team}`] && !score[`lostGrand${team}`]),
		).length;

		return tichuAttempts === 0
			? 0
			: Math.round((tichuSuccesses / tichuAttempts) * 100);
	}

	function countSpecialMoves(scores, team, type) {
		switch (type) {
			case "tichu":
				return scores.filter((score) => score[`tichu${team}`]).length;
			case "grand":
				return scores.filter((score) => score[`grand${team}`]).length;
			case "doubleWin":
				return scores.filter((score) => score[`doubleWin${team}`])
					.length;
			default:
				return 0;
		}
	}
</script>

<Modal {show} title={$t?.settings?.title || "Settings"} on:close={onClose}>
	<div slot="content">
		<div role="tablist" class="tabs tabs-bordered">
			<button
				role="tab"
				tabindex="0"
				class={`tab ${activeTab === "game" ? "tab-active" : ""}`}
				on:click={() => (activeTab = "game")}
				on:keydown={(event) => handleTabKey(event, "game")}
				>{$t?.settings?.game || "Game"}</button
			>
			<button
				role="tab"
				tabindex="0"
				class={`tab ${activeTab === "app" ? "tab-active" : ""}`}
				on:click={() => (activeTab = "app")}
				on:keydown={(event) => handleTabKey(event, "app")}
				>{$t?.settings?.app || "App"}</button
			>
			<button
				role="tab"
				tabindex="0"
				class={`tab ${activeTab === "info" ? "tab-active" : ""}`}
				on:click={() => (activeTab = "info")}
				on:keydown={(event) => handleTabKey(event, "info")}
				>{$t?.settings?.info || "Info"}</button
			>
		</div>
		<div class="mt-4">
			{#if activeTab === "game"}
				<div class="form-control">
					<label class="label" for="teamA">
						<span class="label-text"
							>{$t?.settings?.teamAName || "Team A Name"}</span
						>
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
						<span class="label-text"
							>{$t?.settings?.teamBName || "Team B Name"}</span
						>
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
						<span class="label-text"
							>{$t?.settings?.gameLimit || "Game Limit"}</span
						>
					</label>
					<input
						type="number"
						id="gameLimit"
						class="input input-bordered"
						bind:value={gameLimit}
					/>
				</div>
			{:else if activeTab === "app"}
				<div class="form-control">
					<label class="label" for="themeSelector">
						<span class="label-text"
							>{$t?.settings?.appTheme || "App Theme"}</span
						>
					</label>
					<select
						id="themeSelector"
						class="select select-bordered"
						value={document.documentElement.getAttribute(
							"data-theme",
						) || "dark"}
						on:change={(event) => changeTheme(event.target.value)}
					>
						<option value="dark">Dark</option>
						<option value="light">Light</option>
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
						<option value="dim">Dim</option>
						<option value="nord">Nord</option>
						<option value="sunset">Sunset</option>
					</select>
				</div>
				<div class="form-control mt-4">
					<label class="label" for="languageSelector">
						<span class="label-text"
							>{$t?.settings?.language || "Language"}</span
						>
					</label>
					<select
						id="languageSelector"
						class="select select-bordered"
						bind:value={$languageStore.language}
					>
						<option value="en"
							>{$t?.languages?.en || "English"}</option
						>
						<option value="de"
							>{$t?.languages?.de || "German"}</option
						>
						<option value="fr"
							>{$t?.languages?.fr || "French"}</option
						>
					</select>
				</div>
			{:else if activeTab === "info"}
				<p>
					{$t?.info?.description ||
						"This application is designed to help you manage your game settings efficiently. For more information, visit our website."}
				</p>
			{/if}
		</div>
	</div>
	<div slot="actions">
		<button class="btn" on:click={onClose}
			>{$t?.settings?.close || "Close"}</button
		>
		<button
			class="btn btn-primary ml-2"
			on:click={() => {
				settingsStore.update((store) => ({
					...store,
					teamA,
					teamB,
					gameLimit,
				}));
				onClose();
			}}>{$t?.settings?.save || "Save"}</button
		>
	</div>
</Modal>

<Modal show={showWinner} title={$t?.gameComplete?.title || "Game Complete"}>
	<div slot="content" class="space-y-4">
		<div class="text-center text-2xl font-bold mb-6">
			{winner === "Draft"
				? $t?.gameComplete?.draft || "The game is a draft!"
				: (
						$t?.gameComplete?.winner || "The winner is {winner}!"
					).replace("{winner}", winner)}
		</div>

		<div class="stats stats-vertical lg:stats-horizontal shadow w-full">
			<div class="stat">
				<div class="stat-title">
					{$t?.gameComplete?.totalGames || "Total Games"}
				</div>
				<div class="stat-value text-primary">{scores.length}</div>
			</div>

			<div class="stat">
				<div class="stat-title">
					{$t?.gameComplete?.totalPoints || "Total Points"}
				</div>
				<div class="stat-value text-primary">{totalA + totalB}</div>
			</div>
		</div>

		<div class="divider">
			{$t?.gameComplete?.teamStats || "Team Statistics"}
		</div>

		<div class="stats stats-vertical shadow w-full">
			<div class="stat">
				<div class="stat-title">{teamA}</div>
				<div class="stat-value text-primary">{totalA}</div>
				<div class="stat-desc">
					{$t?.gameComplete?.tichuSuccess || "Tichu Success"}: {calculateTichuSuccess(
						scores,
						"A",
					)}%
				</div>
			</div>

			<div class="stat">
				<div class="stat-title">{teamB}</div>
				<div class="stat-value text-primary">{totalB}</div>
				<div class="stat-desc">
					{$t?.gameComplete?.tichuSuccess || "Tichu Success"}: {calculateTichuSuccess(
						scores,
						"B",
					)}%
				</div>
			</div>
		</div>

		<div class="divider">
			{$t?.gameComplete?.specialMoves || "Special Moves"}
		</div>

		<div class="grid grid-cols-2 gap-4">
			<div class="bg-base-200 p-4 rounded-lg">
				<h3 class="font-bold mb-2">{teamA}</h3>
				<ul class="space-y-2">
					<li>Tichu: {countSpecialMoves(scores, "A", "tichu")}</li>
					<li>
						Grand Tichu: {countSpecialMoves(scores, "A", "grand")}
					</li>
					<li>
						Double Wins: {countSpecialMoves(
							scores,
							"A",
							"doubleWin",
						)}
					</li>
				</ul>
			</div>
			<div class="bg-base-200 p-4 rounded-lg">
				<h3 class="font-bold mb-2">{teamB}</h3>
				<ul class="space-y-2">
					<li>Tichu: {countSpecialMoves(scores, "B", "tichu")}</li>
					<li>
						Grand Tichu: {countSpecialMoves(scores, "B", "grand")}
					</li>
					<li>
						Double Wins: {countSpecialMoves(
							scores,
							"B",
							"doubleWin",
						)}
					</li>
				</ul>
			</div>
		</div>
	</div>
	<div slot="actions">
		<button class="btn btn-primary" on:click={resetWinner}
			>{$t?.gameComplete?.newGame || "New Game"}</button
		>
	</div>
</Modal>
