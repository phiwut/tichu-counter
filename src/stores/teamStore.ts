import { createPersistedStore } from "./createPersistedStore";
import { DEFAULT_TEAM_A, DEFAULT_TEAM_B } from "../lib/constants";

type TeamState = {
	teamA: string;
	teamB: string;
};

const INITIAL_TEAMS: TeamState = {
	teamA: DEFAULT_TEAM_A,
	teamB: DEFAULT_TEAM_B,
};

function normalizeTeams(state: unknown): TeamState {
	if (!state || typeof state !== "object") {
		return { ...INITIAL_TEAMS };
	}

	const teams = state as TeamState;
	return {
		teamA:
			typeof teams.teamA === "string" && teams.teamA.trim()
				? teams.teamA
				: DEFAULT_TEAM_A,
		teamB:
			typeof teams.teamB === "string" && teams.teamB.trim()
				? teams.teamB
				: DEFAULT_TEAM_B,
	};
}

function validateTeams(state: unknown): state is TeamState {
	return (
		Boolean(state) &&
		typeof state === "object" &&
		typeof (state as TeamState).teamA === "string" &&
		typeof (state as TeamState).teamB === "string"
	);
}

export const teamStore = createPersistedStore("teamStore", INITIAL_TEAMS, {
	validate: validateTeams,
	migrate: normalizeTeams,
});
