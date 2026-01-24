import { createPersistedStore } from "./createPersistedStore";

const SUPPORTED_LANGUAGES = ["de", "en", "fr"] as const;
type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

type LanguageState = {
	language: SupportedLanguage;
};

function detectLanguage(): SupportedLanguage {
	const browserLang =
		typeof navigator !== "undefined"
			? (
					navigator.language ||
					(navigator as Navigator & { userLanguage?: string }).userLanguage ||
					"de"
				).split("-")[0]
			: "de";

	return SUPPORTED_LANGUAGES.includes(browserLang) ? browserLang : "de";
}

const INITIAL_LANGUAGE: LanguageState = {
	language: detectLanguage(),
};

function normalizeLanguage(state: unknown): LanguageState {
	if (!state || typeof state !== "object") {
		return { ...INITIAL_LANGUAGE };
	}

	return {
		language: SUPPORTED_LANGUAGES.includes(
			(state as LanguageState).language,
		)
			? (state as LanguageState).language
			: INITIAL_LANGUAGE.language,
	};
}

function validateLanguage(state: unknown): state is LanguageState {
	return (
		Boolean(state) &&
		typeof state === "object" &&
		SUPPORTED_LANGUAGES.includes((state as LanguageState).language)
	);
}

export const languageStore = createPersistedStore(
	"languageStore",
	INITIAL_LANGUAGE,
	{
		validate: validateLanguage,
		migrate: normalizeLanguage,
	},
);
