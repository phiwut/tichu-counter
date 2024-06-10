<script>
	import { scoreStore } from "../stores/scoreStore";
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

	// Function to update total scores
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

	// Function to delete a score entry
	function deleteScore(index) {
		scoreStore.update((store) => {
			store.scores.splice(index, 1);
			return store;
		});
		updateTotals();
	}

	// Function to handle row click
	function handleRowClick(index) {
		activeRowIndex = activeRowIndex === index ? null : index;
	}

	// Function to handle row key events
	function handleRowKey(event, index) {
		if (event.key === "Enter" || event.key === " ") {
			handleRowClick(index);
		}
	}

	// Function to handle click outside the score rows
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
				class="score-row flex items-center justify-between p-4 bg-primary rounded-lg relative"
				role="button"
				tabindex="0"
				on:click={() => handleRowClick(index)}
				on:keydown={(event) => handleRowKey(event, index)}
			>
				<div class="w-1/2 text-center">
					{score.teamA}
					{#if score.tichuA}<span class="badge badge-success"
							>tichu</span
						>{/if}
					{#if score.grandA}<span class="badge badge-success"
							>TICHU</span
						>{/if}
					{#if score.lostTichuA}<span class="badge badge-error"
							>tichu</span
						>{/if}
					{#if score.lostGrandA}<span class="badge badge-error"
							>TICHU</span
						>{/if}
					{#if score.doubleWinA}<span class="badge badge-warning"
							>double-win</span
						>{/if}
				</div>
				<div class="w-1/2 text-center">
					{score.teamB}
					{#if score.tichuB}<span class="badge badge-success"
							>tichu</span
						>{/if}
					{#if score.grandB}<span class="badge badge-success"
							>TICHU</span
						>{/if}
					{#if score.lostTichuB}<span class="badge badge-error"
							>tichu</span
						>{/if}
					{#if score.lostGrandB}<span class="badge badge-error"
							>TICHU</span
						>{/if}
					{#if score.doubleWinB}<span class="badge badge-warning"
							>double win</span
						>{/if}
				</div>
				{#if activeRowIndex === index}
					<button
						class="absolute right-4 btn btn-error btn-sm"
						on:click={() => deleteScore(index)}>Delete</button
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
