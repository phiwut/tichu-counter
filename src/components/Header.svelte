<script>
	import { settingsStore } from "../stores/settingsStore";
	import { scoreStore } from "../stores/scoreStore";

	let totalA = 0;
	let totalB = 0;
	let teamA = "TEAM A";
	let teamB = "TEAM B";

	settingsStore.subscribe((value) => {
		teamA = value.teamA;
		teamB = value.teamB;
	});

	scoreStore.subscribe((value) => {
		totalA = value.totalA;
		totalB = value.totalB;
	});
</script>

<div class="sticky top-0 bg-gray-800 z-10 py-4">
	<div class="flex justify-between w-full px-10">
		<div class="text-xl font-bold">{teamA}</div>
		<div class="text-xl font-bold">{teamB}</div>
	</div>
	<div class="flex justify-between w-full px-10 my-4">
		<input
			type="text"
			value={totalA}
			class="border border-blue-500 rounded-full w-1/2 flex items-center justify-center text-2xl text-center bg-gray-800 text-white mr-2"
			readonly
		/>
		<input
			type="text"
			value={totalB}
			class="border border-blue-500 rounded-full w-1/2 flex items-center justify-center text-2xl text-center bg-gray-800 text-white ml-2"
			readonly
		/>
	</div>
</div>
