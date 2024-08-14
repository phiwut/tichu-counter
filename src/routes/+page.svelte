<script>
	import { onMount } from 'svelte';
	import { fade, slide } from 'svelte/transition';
	import Header from "../components/Header.svelte";
	import Scoreboard from "../components/Scoreboard.svelte";
	import GameControls from "../components/GameControls.svelte";
	import SettingsModal from "../components/SettingsModal.svelte";

	let showSettings = false;

	function toggleSettings() {
		showSettings = !showSettings;
	}
</script>

<div class="flex flex-col h-screen bg-base-100">
	<div class="flex-grow">
		<div transition:fade>
			<Header />
		</div>
		<div transition:slide>
			<Scoreboard />
		</div>
	</div>
	<div class="bg-primary-content w-full z-10 sticky bottom-0" transition:slide={{duration: 300}}>
		<GameControls on:openSettings={toggleSettings} />
	</div>
	<SettingsModal show={showSettings} onClose={toggleSettings} />
</div>

<style>
	:global(body) {
		margin: 0;
		padding: 0;
	}
</style>
