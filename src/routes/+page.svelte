<script lang="ts">
	import { onMount } from 'svelte';
	import { fade, slide } from 'svelte/transition';
	import {
		DEFAULT_DESCRIPTION,
		DEFAULT_OG_IMAGE,
		DEFAULT_OG_IMAGE_ALT,
		DEFAULT_TITLE,
		SITE_NAME,
		SITE_URL
	} from '$lib/seo';
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

	const canonicalUrl = SITE_URL;
	const structuredData = {
		'@context': 'https://schema.org',
		'@type': 'WebApplication',
		name: SITE_NAME,
		url: SITE_URL,
		applicationCategory: 'GameApplication',
		operatingSystem: 'Any',
		description: DEFAULT_DESCRIPTION,
		offers: {
			'@type': 'Offer',
			price: '0',
			priceCurrency: 'USD'
		}
	};
</script>

<svelte:head>
	<title>{DEFAULT_TITLE}</title>
	<meta name="description" content={DEFAULT_DESCRIPTION} />
	<link rel="canonical" href={canonicalUrl} />
	<meta name="robots" content="index, follow" />
	<meta property="og:site_name" content={SITE_NAME} />
	<meta property="og:title" content={DEFAULT_TITLE} />
	<meta property="og:description" content={DEFAULT_DESCRIPTION} />
	<meta property="og:type" content="website" />
	<meta property="og:url" content={canonicalUrl} />
	<meta property="og:image" content={DEFAULT_OG_IMAGE} />
	<meta property="og:image:alt" content={DEFAULT_OG_IMAGE_ALT} />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={DEFAULT_TITLE} />
	<meta name="twitter:description" content={DEFAULT_DESCRIPTION} />
	<meta name="twitter:image" content={DEFAULT_OG_IMAGE} />
	<script type="application/ld+json">
		{JSON.stringify(structuredData)}
	</script>
</svelte:head>

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
