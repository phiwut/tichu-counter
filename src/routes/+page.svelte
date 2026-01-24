<script lang="ts">
	import { onMount } from 'svelte';
	import { fade, slide } from 'svelte/transition';
	import Header from "../components/Header.svelte";
	import Scoreboard from "../components/Scoreboard.svelte";
	import GameControls from "../components/GameControls.svelte";
	import SettingsModal from "../components/SettingsModal.svelte";

	let showSettings = false;
	let prefersReducedMotion = false;

	function toggleSettings() {
		showSettings = !showSettings;
	}

	onMount(() => {
		const media = window.matchMedia("(prefers-reduced-motion: reduce)");
		const handleChange = (event) => {
			prefersReducedMotion = event.matches;
		};
		prefersReducedMotion = media.matches;
		media.addEventListener("change", handleChange);
		return () => {
			media.removeEventListener("change", handleChange);
		};
	});
</script>

<div class="flex flex-col h-screen bg-base-100">
	<div class="flex-grow">
		{#if prefersReducedMotion}
			<div>
				<Header />
			</div>
			<div>
				<Scoreboard />
			</div>
		{:else}
			<div transition:fade>
				<Header />
			</div>
			<div transition:slide>
				<Scoreboard />
			</div>
		{/if}
	</div>
	{#if prefersReducedMotion}
		<div class="bg-primary-content w-full z-10 sticky bottom-0">
			<GameControls on:openSettings={toggleSettings} />
		</div>
	{:else}
		<div
			class="bg-primary-content w-full z-10 sticky bottom-0"
			transition:slide={{ duration: 300 }}
		>
			<GameControls on:openSettings={toggleSettings} />
		</div>
	{/if}
	<SettingsModal show={showSettings} onClose={toggleSettings} />
</div>

<style>
	:global(body) {
		margin: 0;
		padding: 0;
	}
</style>
