/**
 * @file Application translations keyed by language.
 */

import { derived, type Readable } from 'svelte/store';
import { languageStore, type SupportedLanguage } from '../stores/language-store';
import de from '../translations/de';
import en from '../translations/en';
import fr from '../translations/fr';

export interface Translations {
	settings: {
		title: string;
		game: string;
		app: string;
		info: string;
		teamAName: string;
		teamBName: string;
		gameLimit: string;
		appTheme: string;
		language: string;
		close: string;
		save: string;
	};
	gameControls: {
		addScore: string;
		reset: string;
		confirmReset: string;
		yes: string;
		no: string;
		delete: string;
		tichuLabel: string;
		grandTichuLabel: string;
		lostTichuLabel: string;
		lostGrandTichuLabel: string;
		doubleWinLabel: string;
		scoreTeamA: string;
		scoreTeamB: string;
	};
	languages: {
		en: string;
		de: string;
		fr: string;
	};
	header: {
		points: string;
	};
	info: {
		description: string;
	};
	gameComplete: {
		title: string;
		winner: string;
		draft: string;
		newGame: string;
		close: string;
	};
}

const translations: Record<SupportedLanguage, Translations> = { de, en, fr };

export const t: Readable<Translations> = derived(
	languageStore,
	($languageStore) => translations[$languageStore.language]
);
