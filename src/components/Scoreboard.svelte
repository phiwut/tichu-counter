<!--
  @component
  This component represents the scoreboard for the Tichu scoring application.
  It displays a list of all scores for both teams, including special events like Tichu and Grand Tichu.
  The component allows for score deletion and provides an interactive interface for viewing score details.

  Features:
  - Displays all scores in a scrollable list
  - Shows special events (Tichu, Grand Tichu, Double Win) with badges
  - Allows deletion of individual score entries
  - Interactive row expansion for more details
  - Automatically updates total scores when entries are added or deleted
  - Keyboard accessible for better usability
-->

<script>
	import { scoreStore } from "../stores/scoreStore";
	import { t } from "../lib/translations";
	import { onMount } from "svelte";

	let scores = [];
	let totalA = 0;
	let totalB = 0;
	let activeRowIndex = null;

	// Subscribe to score store to update local state
	scoreStore.subscribe((value) => {
		scores = value.scores;
		totalA = value.totalA;
		totalB = value.totalB;
	});

	/**
	 * Updates the total scores for both teams
	 */
	function updateTotals() {
		let sumA = 0;
		let sumB = 0;
		scores.forEach((score) => {
			sumA += score.teamA;
			sumB += score.teamB;
		});
		scoreStore.update((store) => {
			store.totalA = sumA;
			store.totalB = sumB;
			return store;
		});
	}

	/**
	 * Deletes a score entry at the specified index
	 * @param {number} index - The index of the score to delete
	 */
	function deleteScore(index) {
		scoreStore.update((store) => {
			store.scores.splice(index, 1);
			return store;
		});
		updateTotals();
	}

	/**
	 * Handles the click event on a score row
	 * @param {number} index - The index of the clicked row
	 */
	function handleRowClick(index) {
		activeRowIndex = activeRowIndex === index ? null : index;
	}

	/**
	 * Handles keyboard events for accessibility
	 * @param {KeyboardEvent} event - The keyboard event
	 * @param {number} index - The index of the row
	 */
	function handleRowKey(event, index) {
		if (event.key === "Enter" || event.key === " ") {
			handleRowClick(index);
		}
	}

	/**
	 * Handles clicks outside of score rows to close expanded rows
	 * @param {MouseEvent} event - The click event
	 */
	function handleClickOutside(event) {
		if (!event.target.closest(".score-row")) {
			activeRowIndex = null;
		}
	}

	// Register and unregister event listener for click outside
	onMount(() => {
		document.addEventListener("click", handleClickOutside);
		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
	});

	// Reactive statement to update totals
	$: updateTotals();
</script>

<div class="w-full px-5 my-4 overflow-y-auto flex-grow z-0">
	<div class="flex flex-col space-y-2">
		{#each scores as score, index}
			<div
				class="score-row flex items-center justify-between p-4 bg-primary rounded-lg relative text-primary-content"
				role="button"
				tabindex="0"
				on:click={() => handleRowClick(index)}
				on:keydown={(event) => handleRowKey(event, index)}
			>
				<div class="w-1/2 text-center font-medium">
					{score.teamA}
					{#if score.tichuA}<span
							class="badge badge-success text-success-content"
							>{$t?.gameControls?.tichu || "tichu"}</span
						>{/if}
					{#if score.grandA}<span
							class="badge badge-success text-success-content"
							>{$t?.gameControls?.grandTichu || "TICHU"}</span
						>{/if}
					{#if score.lostTichuA}<span
							class="badge badge-error text-error-content"
							>{$t?.gameControls?.lostTichu || "tichu"}</span
						>{/if}
					{#if score.lostGrandA}<span
							class="badge badge-error text-error-content"
							>{$t?.gameControls?.lostGrandTichu || "TICHU"}</span
						>{/if}
					{#if score.doubleWinA}<span
							class="badge badge-warning text-warning-content"
							>{$t?.gameControls?.doubleWin || "double-win"}</span
						>{/if}
				</div>
				<div class="w-1/2 text-center font-medium">
					{score.teamB}
					{#if score.tichuB}<span
							class="badge badge-success text-success-content"
							>{$t?.gameControls?.tichu || "tichu"}</span
						>{/if}
					{#if score.grandB}<span
							class="badge badge-success text-success-content"
							>{$t?.gameControls?.grandTichu || "TICHU"}</span
						>{/if}
					{#if score.lostTichuB}<span
							class="badge badge-error text-error-content"
							>{$t?.gameControls?.lostTichu || "tichu"}</span
						>{/if}
					{#if score.lostGrandB}<span
							class="badge badge-error text-error-content"
							>{$t?.gameControls?.lostGrandTichu || "TICHU"}</span
						>{/if}
					{#if score.doubleWinB}<span
							class="badge badge-warning text-warning-content"
							>{$t?.gameControls?.doubleWin || "double win"}</span
						>{/if}
				</div>
				{#if activeRowIndex === index}
					<button
						class="absolute right-4 btn btn-error btn-sm text-error-content"
						on:click={() => deleteScore(index)}
						>{$t?.gameControls?.delete || "Delete"}</button
					>
				{/if}
			</div>
		{/each}
	</div>
</div>

<style>
	.score-row {
		position: relative;
	}
</style>
