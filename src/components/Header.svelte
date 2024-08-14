<!--
  @component
  This component represents the header of the Tichu scoring application.
  It displays the current scores for both teams and their names.
  The component subscribes to the settingsStore and scoreStore to keep
  the displayed information up-to-date.

  Features:
  - Displays team names (from settingsStore)
  - Shows current scores for both teams (from scoreStore)
  - Sticky positioning at the top of the page
-->

<script>
	import { settingsStore } from "../stores/settingsStore";
	import { scoreStore } from "../stores/scoreStore";

	// Local state variables
	let totalA = 0;
	let totalB = 0;
	let teamA = "TEAM A";
	let teamB = "TEAM B";

	// Subscribe to settings and score stores to update local state
	settingsStore.subscribe((value) => {
		teamA = value.teamA;
		teamB = value.teamB;
	});

	scoreStore.subscribe((value) => {
		totalA = value.totalA;
		totalB = value.totalB;
	});
</script>

<div class="sticky top-0 bg-primary-content z-10 p-5">
	<div class="stats shadow w-full">
		<div class="stat place-items-center">
			<div class="stat-title">{teamA}</div>
			<div class="stat-value text-primary">{totalA}</div>
			<div class="stat-desc">Points</div>
		</div>
		<div class="stat place-items-center">
			<div class="stat-title">{teamB}</div>
			<div class="stat-value text-primary">{totalB}</div>
			<div class="stat-desc">Points</div>
		</div>
	</div>
</div>
