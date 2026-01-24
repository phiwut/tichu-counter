import { createPersistedStore } from "./createPersistedStore";
import {
	DEFAULT_GAME_LIMIT,
	DEFAULT_TEAM_A,
	DEFAULT_TEAM_B,
} from "../lib/constants";

export type SettingsState = {
	teamA: string;
	teamB: string;
	gameLimit: number;
};

const INITIAL_SETTINGS: SettingsState = {
	teamA: DEFAULT_TEAM_A,
	teamB: DEFAULT_TEAM_B,
	gameLimit: DEFAULT_GAME_LIMIT,
};

function normalizeSettings(state: unknown): SettingsState {
	if (!state || typeof state !== "object") {
		return { ...INITIAL_SETTINGS };
	}

	const settings = state as SettingsState;
	return {
		teamA:
			typeof settings.teamA === "string" && settings.teamA.trim()
				? settings.teamA
				: DEFAULT_TEAM_A,
		teamB:
			typeof settings.teamB === "string" && settings.teamB.trim()
				? settings.teamB
				: DEFAULT_TEAM_B,
		gameLimit:
			Number.isFinite(Number(settings.gameLimit)) &&
			Number(settings.gameLimit) > 0
				? Number(settings.gameLimit)
				: DEFAULT_GAME_LIMIT,
	};
}

function validateSettings(state: unknown): state is SettingsState {
	return (
		Boolean(state) &&
		typeof state === "object" &&
		typeof (state as SettingsState).teamA === "string" &&
		typeof (state as SettingsState).teamB === "string" &&
		Number.isFinite(Number((state as SettingsState).gameLimit))
	);
}

export const settingsStore = createPersistedStore(
	"settingsStore",
	INITIAL_SETTINGS,
	{
		validate: validateSettings,
		migrate: normalizeSettings,
	},
);
