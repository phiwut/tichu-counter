import {
	DEFAULT_GAME_LIMIT,
	DEFAULT_TEAM_A,
	DEFAULT_TEAM_B
} from './constants';
import type { Round } from './round';
import type { ScoreState } from '../stores/score-store';
import type { Settings } from '../stores/settings-store';

const SUPPORTED_LANGUAGES = ['de', 'en', 'fr'] as const;

type LanguageStateLike = {
	language?: string;
};

type ExportPayload = {
	version: number;
	exportedAt: string;
	scores: {
		rounds: Round[];
	};
	settings: {
		teamA: string;
		teamB: string;
		gameLimit: number;
	};
	language: {
		language: string;
	};
};

export function buildExportPayload(
	scoreState: ScoreState,
	settingsState: Settings,
	languageState: LanguageStateLike
): ExportPayload {
	const languageValue = languageState?.language;
	return {
		version: 2,
		exportedAt: new Date().toISOString(),
		scores: {
			rounds: scoreState?.rounds ?? []
		},
		settings: {
			teamA: settingsState?.teamA ?? DEFAULT_TEAM_A,
			teamB: settingsState?.teamB ?? DEFAULT_TEAM_B,
			gameLimit: settingsState?.gameLimit ?? DEFAULT_GAME_LIMIT
		},
		language: {
			language:
				typeof languageValue === 'string' &&
				SUPPORTED_LANGUAGES.includes(languageValue as (typeof SUPPORTED_LANGUAGES)[number])
					? languageValue
					: 'de'
		}
	};
}

export function downloadExport(payload: ExportPayload) {
	const blob = new Blob([JSON.stringify(payload, null, 2)], {
		type: 'application/json'
	});
	const url = URL.createObjectURL(blob);
	const link = document.createElement('a');
	link.href = url;
	link.download = 'tichu-counter-export.json';
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
	URL.revokeObjectURL(url);
}

function normalizeSettings(settings: Partial<Settings> | undefined) {
	if (!settings || typeof settings !== 'object') {
		return null;
	}
	const teamA =
		typeof settings.teamA === 'string' && settings.teamA.trim()
			? settings.teamA
			: DEFAULT_TEAM_A;
	const teamB =
		typeof settings.teamB === 'string' && settings.teamB.trim()
			? settings.teamB
			: DEFAULT_TEAM_B;
	const gameLimit =
		Number.isFinite(Number(settings.gameLimit)) && Number(settings.gameLimit) > 0
			? Number(settings.gameLimit)
			: DEFAULT_GAME_LIMIT;
	return { teamA, teamB, gameLimit };
}

function normalizeLanguage(language: LanguageStateLike | undefined) {
	if (!language || typeof language !== 'object') {
		return null;
	}
	const value = language.language;
	return typeof value === 'string' && SUPPORTED_LANGUAGES.includes(value as (typeof SUPPORTED_LANGUAGES)[number])
		? { language: value }
		: { language: 'de' };
}

export function parseImportPayload(raw: string) {
	const parsed = JSON.parse(raw) as {
		scores?: { rounds?: unknown[]; scores?: unknown[] } | unknown[];
		settings?: Partial<Settings>;
		language?: LanguageStateLike;
	};
	if (!parsed || typeof parsed !== 'object') {
		throw new Error('Invalid import payload');
	}

	let scoreEntries: unknown[] | null = null;
	if (parsed.scores && typeof parsed.scores === 'object' && !Array.isArray(parsed.scores)) {
		if (Array.isArray(parsed.scores.rounds)) {
			scoreEntries = parsed.scores.rounds;
		} else if (Array.isArray(parsed.scores.scores)) {
			scoreEntries = parsed.scores.scores;
		}
	} else if (Array.isArray(parsed.scores)) {
		scoreEntries = parsed.scores;
	}

	const settings = normalizeSettings(parsed.settings);
	const language = normalizeLanguage(parsed.language);

	if (!scoreEntries && !settings && !language) {
		throw new Error('No importable data found');
	}

	return {
		scores: scoreEntries,
		settings,
		language
	};
}
