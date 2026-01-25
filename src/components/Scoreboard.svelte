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

<script lang="ts">
	import { scoreStore } from "../stores/scoreStore";
	import type { ScoreEntry } from "../stores/scoreStore";
	import { t } from "../lib/translations";
	import { onMount } from "svelte";
	import ScoreBadge from "./ScoreBadge.svelte";

	let scores: ScoreEntry[] = [];
	let activeRowIndex: number | null = null;
	let touchStartX: number | null = null;
	let touchRowIndex: number | null = null;
	let suppressClick = false;

	// Subscribe to score store to update local state
	scoreStore.subscribe((value) => {
		scores = value.scores;
	});

	/**
	 * Deletes a score entry at the specified index
	 * @param {number} index - The index of the score to delete
	 */
	function deleteScore(index: number) {
		scoreStore.deleteScoreEntry(index);
	}

	/**
	 * Handles the click event on a score row
	 * @param {number} index - The index of the clicked row
	 */
	function handleRowClick(index: number) {
		if (suppressClick) {
			suppressClick = false;
			return;
		}
		activeRowIndex = activeRowIndex === index ? null : index;
	}

	/**
	 * Handles keyboard events for accessibility
	 * @param {KeyboardEvent} event - The keyboard event
	 * @param {number} index - The index of the row
	 */
	function handleRowKey(event: KeyboardEvent, index: number) {
		if (event.key === "Enter" || event.key === " ") {
			handleRowClick(index);
		}
	}

	/**
	 * Handles clicks outside of score rows to close expanded rows
	 * @param {MouseEvent} event - The click event
	 */
	function handleClickOutside(event: MouseEvent) {
		const target = event.target as HTMLElement;
		if (!target.closest(".score-row")) {
			activeRowIndex = null;
		}
	}

	function handleTouchStart(event: TouchEvent, index: number) {
		touchStartX = event.touches[0]?.clientX ?? null;
		touchRowIndex = index;
	}

	function handleTouchEnd(event: TouchEvent, index: number) {
		if (touchStartX === null || touchRowIndex !== index) {
			return;
		}
		const touchEndX = event.changedTouches[0]?.clientX ?? touchStartX;
		const deltaX = touchStartX - touchEndX;
		if (deltaX > 80) {
			suppressClick = true;
			deleteScore(index);
		}
		touchStartX = null;
		touchRowIndex = null;
	}

	// Register and unregister event listener for click outside
	onMount(() => {
		document.addEventListener("click", handleClickOutside);
		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
	});

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
				on:touchstart={(event) => handleTouchStart(event, index)}
				on:touchend={(event) => handleTouchEnd(event, index)}
			>
				<div class="w-1/2 text-center font-medium">
					{score.teamA}
					<ScoreBadge
						type="success"
						show={score.tichuA}
						label={$t?.gameControls?.tichu || "tichu"}
						icon="T"
					/>
					<ScoreBadge
						type="success"
						show={score.grandA}
						label={$t?.gameControls?.grandTichu || "TICHU"}
						icon="GT"
					/>
					<ScoreBadge
						type="error"
						show={score.lostTichuA}
						label={$t?.gameControls?.lostTichu || "tichu"}
						icon="LT"
					/>
					<ScoreBadge
						type="error"
						show={score.lostGrandA}
						label={$t?.gameControls?.lostGrandTichu || "TICHU"}
						icon="LGT"
					/>
					<ScoreBadge
						type="warning"
						show={score.doubleWinA}
						label={$t?.gameControls?.doubleWin || "double-win"}
						icon="DW"
					/>
				</div>
				<div class="w-1/2 text-center font-medium">
					{score.teamB}
					<ScoreBadge
						type="success"
						show={score.tichuB}
						label={$t?.gameControls?.tichu || "tichu"}
						icon="T"
					/>
					<ScoreBadge
						type="success"
						show={score.grandB}
						label={$t?.gameControls?.grandTichu || "TICHU"}
						icon="GT"
					/>
					<ScoreBadge
						type="error"
						show={score.lostTichuB}
						label={$t?.gameControls?.lostTichu || "tichu"}
						icon="LT"
					/>
					<ScoreBadge
						type="error"
						show={score.lostGrandB}
						label={$t?.gameControls?.lostGrandTichu || "TICHU"}
						icon="LGT"
					/>
					<ScoreBadge
						type="warning"
						show={score.doubleWinB}
						label={$t?.gameControls?.doubleWin || "double win"}
						icon="DW"
					/>
				</div>
				<button
					class={`delete-button absolute right-4 btn btn-error btn-sm text-error-content ${
						activeRowIndex === index ? "delete-button--active" : ""
					}`}
					on:click|stopPropagation={() => deleteScore(index)}
					aria-label={$t?.gameControls?.delete || "Delete"}
					aria-hidden={activeRowIndex !== index}
					tabindex={activeRowIndex === index ? 0 : -1}
				>
					{$t?.gameControls?.delete || "Delete"}
				</button>
			</div>
		{/each}
	</div>
</div>

<style>
	.score-row {
		position: relative;
	}

	.delete-button {
		opacity: 0;
		transform: translateX(6px);
		pointer-events: none;
		transition: opacity 0.2s ease, transform 0.2s ease;
	}

	.delete-button--active {
		opacity: 1;
		transform: translateX(0);
		pointer-events: auto;
	}
</style>
