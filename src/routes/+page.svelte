<script>
	import Header from "../components/Header.svelte";
	import Scoreboard from "../components/Scoreboard.svelte";
	import GameControls from "../components/GameControls.svelte";
	import SettingsModal from "../components/SettingsModal.svelte";
</script>

<div class="flex flex-col h-screen bg-base-100">
	<div class="flex-grow">
		<Header />
		<Scoreboard />
	</div>
	<div class="bg-primary-content w-full z-10 sticky bottom-0">
		<GameControls />
	</div>
	<SettingsModal />
</div>
