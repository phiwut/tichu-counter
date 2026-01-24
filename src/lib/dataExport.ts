import {
	DEFAULT_GAME_LIMIT,
	DEFAULT_TEAM_A,
	DEFAULT_TEAM_B,
} from "./constants";

const SUPPORTED_LANGUAGES = ["de", "en", "fr"] as const;

type ScoreStateLike = {
	scores?: unknown[];
	totalA?: number;
	totalB?: number;
};

type SettingsStateLike = {
	teamA?: string;
	teamB?: string;
	gameLimit?: number;
};

type LanguageStateLike = {
	language?: string;
};

type ExportPayload = {
	version: number;
	exportedAt: string;
	scores: {
		scores: unknown[];
		totalA: number;
		totalB: number;
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
	scoreState: ScoreStateLike,
	settingsState: SettingsStateLike,
	languageState: LanguageStateLike,
): ExportPayload {
	const languageValue = languageState?.language;
	return {
		version: 1,
		exportedAt: new Date().toISOString(),
		scores: {
			scores: scoreState?.scores ?? [],
			totalA: scoreState?.totalA ?? 0,
			totalB: scoreState?.totalB ?? 0,
		},
		settings: {
			teamA: settingsState?.teamA ?? DEFAULT_TEAM_A,
			teamB: settingsState?.teamB ?? DEFAULT_TEAM_B,
			gameLimit: settingsState?.gameLimit ?? DEFAULT_GAME_LIMIT,
		},
		language: {
			language:
				typeof languageValue === "string" &&
				SUPPORTED_LANGUAGES.includes(languageValue)
					? languageValue
					: "de",
		},
	};
}

export function downloadExport(payload: ExportPayload) {
	const blob = new Blob([JSON.stringify(payload, null, 2)], {
		type: "application/json",
	});
	const url = URL.createObjectURL(blob);
	const link = document.createElement("a");
	link.href = url;
	link.download = "tichu-counter-export.json";
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
	URL.revokeObjectURL(url);
}

function normalizeSettings(settings: SettingsStateLike | undefined) {
	if (!settings || typeof settings !== "object") {
		return null;
	}
	const teamA =
		typeof settings.teamA === "string" && settings.teamA.trim()
			? settings.teamA
			: DEFAULT_TEAM_A;
	const teamB =
		typeof settings.teamB === "string" && settings.teamB.trim()
			? settings.teamB
			: DEFAULT_TEAM_B;
	const gameLimit =
		Number.isFinite(Number(settings.gameLimit)) && Number(settings.gameLimit) > 0
			? Number(settings.gameLimit)
			: DEFAULT_GAME_LIMIT;
	return { teamA, teamB, gameLimit };
}

function normalizeLanguage(language: LanguageStateLike | undefined) {
	if (!language || typeof language !== "object") {
		return null;
	}
	const value = language.language;
	return typeof value === "string" && SUPPORTED_LANGUAGES.includes(value)
		? { language: value }
		: { language: "de" };
}

export function parseImportPayload(raw: string) {
	const parsed = JSON.parse(raw) as {
		scores?: { scores?: unknown[] } | unknown[];
		settings?: SettingsStateLike;
		language?: LanguageStateLike;
	};
	if (!parsed || typeof parsed !== "object") {
		throw new Error("Invalid import payload");
	}

	const scoresArray = Array.isArray(parsed.scores?.scores)
		? parsed.scores.scores
		: Array.isArray(parsed.scores)
			? parsed.scores
			: null;

	const settings = normalizeSettings(parsed.settings);
	const language = normalizeLanguage(parsed.language);

	if (!scoresArray && !settings && !language) {
		throw new Error("No importable data found");
	}

	return {
		scores: scoresArray,
		settings,
		language,
	};
}
