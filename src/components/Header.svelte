<script>
	import { settingsStore } from "../stores/settingsStore";
	import { scoreStore } from "../stores/scoreStore";

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

<div class="sticky top-0 bg-primary-content z-10 py-4">
	<div class="flex justify-between w-full px-5">
		<div class="text-xl text-center font-bold">{teamA}</div>
		<div class="text-xl text-center font-bold">{teamB}</div>
	</div>
	<div class="flex justify-between w-full px-5 my-4">
		<input
			type="text"
			value={totalA}
			class="border border-primary rounded-full w-1/2 flex items-center justify-center text-2xl text-center bg-gray-800 text-white mr-2"
			readonly
		/>
		<input
			type="text"
			value={totalB}
			class="border border-primary rounded-full w-1/2 flex items-center justify-center text-2xl text-center bg-gray-800 text-white ml-2"
			readonly
		/>
	</div>
</div>
