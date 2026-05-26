<script lang="ts">
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import { settingsStore } from '../stores/settings-store';
	import { languageStore, type SupportedLanguage } from '../stores/language-store';
	import { t } from '../lib/translations';
	import { DAISYUI_THEMES } from '../lib/themes';
	import Modal from './Modal.svelte';

	export let show = false;
	export let onClose: () => void;

	let teamA: string;
	let teamB: string;
	let gameLimit: number;
	let activeTab: 'game' | 'app' | 'info' = 'game';
	let selectedTheme: string;
	let selectedLanguage: SupportedLanguage;

	onMount(() => {
		const settings = get(settingsStore);
		teamA = settings.teamA;
		teamB = settings.teamB;
		gameLimit = settings.gameLimit;
		selectedTheme = document.documentElement.getAttribute('data-theme') || 'dark';
		selectedLanguage = get(languageStore).language;
	});

	function saveSettings(): void {
		settingsStore.update((store) => ({
			...store,
			teamA,
			teamB,
			gameLimit
		}));
		languageStore.update((store) => ({ ...store, language: selectedLanguage }));
		onClose();
	}

	function handleTabKey(event: KeyboardEvent, tab: 'game' | 'app' | 'info'): void {
		if (event.key === 'Enter' || event.key === ' ') {
			activeTab = tab;
		}
	}

	function changeTheme(event: Event): void {
		const theme = (event.target as HTMLSelectElement).value;
		document.documentElement.setAttribute('data-theme', theme);
		selectedTheme = theme;
	}
</script>

<Modal {show} title={$t.settings.title}>
	<div slot="content">
		<div role="tablist" class="tabs tabs-bordered">
			<button
				role="tab"
				tabindex="0"
				class={`tab ${activeTab === 'game' ? 'tab-active' : ''}`}
				on:click={() => (activeTab = 'game')}
				on:keydown={(event) => handleTabKey(event, 'game')}
			>
				{$t.settings.game}
			</button>
			<button
				role="tab"
				tabindex="0"
				class={`tab ${activeTab === 'app' ? 'tab-active' : ''}`}
				on:click={() => (activeTab = 'app')}
				on:keydown={(event) => handleTabKey(event, 'app')}
			>
				{$t.settings.app}
			</button>
			<button
				role="tab"
				tabindex="0"
				class={`tab ${activeTab === 'info' ? 'tab-active' : ''}`}
				on:click={() => (activeTab = 'info')}
				on:keydown={(event) => handleTabKey(event, 'info')}
			>
				{$t.settings.info}
			</button>
		</div>
		<div class="mt-4">
			{#if activeTab === 'game'}
				<div class="form-control">
					<label class="label" for="teamA">
						<span class="label-text">{$t.settings.teamAName}</span>
					</label>
					<input type="text" id="teamA" class="input input-bordered" bind:value={teamA} />
				</div>
				<div class="form-control mt-4">
					<label class="label" for="teamB">
						<span class="label-text">{$t.settings.teamBName}</span>
					</label>
					<input type="text" id="teamB" class="input input-bordered" bind:value={teamB} />
				</div>
				<div class="form-control mt-4">
					<label class="label" for="gameLimit">
						<span class="label-text">{$t.settings.gameLimit}</span>
					</label>
					<input type="number" id="gameLimit" class="input input-bordered" bind:value={gameLimit} />
				</div>
			{:else if activeTab === 'app'}
				<div class="form-control">
					<label class="label" for="themeSelector">
						<span class="label-text">{$t.settings.appTheme}</span>
					</label>
					<select
						id="themeSelector"
						class="select select-bordered"
						value={selectedTheme}
						on:change={changeTheme}
					>
						{#each DAISYUI_THEMES as theme}
							<option value={theme}>{theme}</option>
						{/each}
					</select>
				</div>
				<div class="form-control mt-4">
					<label class="label" for="languageSelector">
						<span class="label-text">{$t.settings.language}</span>
					</label>
					<select id="languageSelector" class="select select-bordered" bind:value={selectedLanguage}>
						<option value="en">{$t.languages.en}</option>
						<option value="de">{$t.languages.de}</option>
						<option value="fr">{$t.languages.fr}</option>
					</select>
				</div>
			{:else if activeTab === 'info'}
				<div class="prose">
					<p>{$t.info.description}</p>
				</div>
			{/if}
		</div>
	</div>
	<div slot="actions">
		<button class="btn btn-primary" on:click={saveSettings}>{$t.settings.save}</button>
		<button class="btn" on:click={onClose}>{$t.settings.close}</button>
	</div>
</Modal>
