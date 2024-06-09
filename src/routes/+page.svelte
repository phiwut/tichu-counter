<script>
	import Header from "../components/Header.svelte";
	import Scoreboard from "../components/Scoreboard.svelte";
	import PlayerInput from "../components/PlayerInput.svelte";
	import GameControls from "../components/GameControls.svelte";
	import SettingsModal from "../components/SettingsModal.svelte";
</script>

<div class="h-screen">
	<Header />
	<Scoreboard />
	<div class="sticky bg-gray-800 bottom-0 w-full z-10">
		<PlayerInput />
		<GameControls />
	</div>
	<SettingsModal />
</div>
