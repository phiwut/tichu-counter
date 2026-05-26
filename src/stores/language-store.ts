/**
 * @file Manages the application's language state.
 */

import { persistedStore } from '../lib/persisted-store';

const SUPPORTED_LANGUAGES = ['de', 'en', 'fr'] as const;

export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

const DEFAULT_LANGUAGE: SupportedLanguage = 'de';

interface LanguageSettings {
	language: SupportedLanguage;
}

function isSupportedLanguage(lang: string): lang is SupportedLanguage {
	return (SUPPORTED_LANGUAGES as readonly string[]).includes(lang);
}

function getInitialLanguage(): SupportedLanguage {
	if (typeof navigator === 'undefined') {
		return DEFAULT_LANGUAGE;
	}
	const browserLang = navigator.language.split('-')[0];
	return isSupportedLanguage(browserLang) ? browserLang : DEFAULT_LANGUAGE;
}

function parseLanguageSettings(raw: unknown): LanguageSettings | undefined {
	if (!raw || typeof raw !== 'object') return undefined;
	const lang = (raw as LanguageSettings).language;
	if (lang && isSupportedLanguage(lang)) {
		return { language: lang };
	}
	return undefined;
}

export const languageStore = persistedStore<LanguageSettings>(
	'languageStore',
	{ language: getInitialLanguage() },
	parseLanguageSettings
);
