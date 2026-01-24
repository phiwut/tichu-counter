import { derived } from "svelte/store";
import { createPersistedStore } from "./createPersistedStore";
import { settingsStore } from "./settingsStore";

const MAX_HISTORY = 50;

export type ScoreEntry = {
	teamA: number;
	teamB: number;
	tichuA: boolean;
	tichuB: boolean;
	grandA: boolean;
	grandB: boolean;
	lostTichuA: boolean;
	lostTichuB: boolean;
	lostGrandA: boolean;
	lostGrandB: boolean;
	doubleWinA: boolean;
	doubleWinB: boolean;
};

export type ScoreSnapshot = {
	scores: ScoreEntry[];
	totalA: number;
	totalB: number;
};

export type ScoreState = ScoreSnapshot & {
	past: ScoreSnapshot[];
	future: ScoreSnapshot[];
};

const EMPTY_STATE: ScoreState = {
	totalA: 0,
	totalB: 0,
	scores: [],
	past: [],
	future: [],
};

const SCORE_FLAGS = [
	"tichuA",
	"tichuB",
	"grandA",
	"grandB",
	"lostTichuA",
	"lostTichuB",
	"lostGrandA",
	"lostGrandB",
	"doubleWinA",
	"doubleWinB",
];

function isNumber(value: unknown): value is number {
	return Number.isFinite(value);
}

function normalizeScoreEntry(entry: Record<string, unknown>): ScoreEntry | null {
	if (!entry || typeof entry !== "object") {
		return null;
	}

	const teamA = Number(entry.teamA);
	const teamB = Number(entry.teamB);

	if (!isNumber(teamA) || !isNumber(teamB)) {
		return null;
	}

	const normalized = {
		teamA,
		teamB,
		tichuA: false,
		tichuB: false,
		grandA: false,
		grandB: false,
		lostTichuA: false,
		lostTichuB: false,
		lostGrandA: false,
		lostGrandB: false,
		doubleWinA: false,
		doubleWinB: false,
	};
	SCORE_FLAGS.forEach((flag) => {
		normalized[flag] = Boolean(entry[flag]);
	});

	return normalized;
}

function calculateTotals(scores: ScoreEntry[]): {
	totalA: number;
	totalB: number;
} {
	return scores.reduce(
		(totals, score) => ({
			totalA: totals.totalA + score.teamA,
			totalB: totals.totalB + score.teamB,
		}),
		{ totalA: 0, totalB: 0 },
	);
}

function normalizeScoreState(state: unknown): ScoreState {
	if (!state || typeof state !== "object") {
		return EMPTY_STATE;
	}

	const scores = Array.isArray((state as ScoreState).scores)
		? (state as ScoreState).scores
				.map((entry) => normalizeScoreEntry(entry as Record<string, unknown>))
				.filter((entry): entry is ScoreEntry => Boolean(entry))
		: [];
	const totals = calculateTotals(scores);

	return {
		...EMPTY_STATE,
		...totals,
		scores,
		past: [],
		future: [],
	};
}

function validateScoreState(state: unknown): state is ScoreState {
	return (
		Boolean(state) &&
		typeof state === "object" &&
		Array.isArray((state as ScoreState).scores) &&
		isNumber((state as ScoreState).totalA) &&
		isNumber((state as ScoreState).totalB)
	);
}

function trimHistory(history: ScoreSnapshot[]) {
	if (history.length <= MAX_HISTORY) {
		return history;
	}
	return history.slice(history.length - MAX_HISTORY);
}

const baseStore = createPersistedStore("scoreStore", EMPTY_STATE, {
	validate: validateScoreState,
	migrate: normalizeScoreState,
});

const { subscribe, set, update } = baseStore;

function addScoreEntry(entry: ScoreEntry) {
	update((state) => {
		const scores = [...state.scores, entry];
		const totals = calculateTotals(scores);
		const past = trimHistory([
			...state.past,
			{ scores: state.scores, totalA: state.totalA, totalB: state.totalB },
		]);

		return {
			...state,
			...totals,
			scores,
			past,
			future: [],
		};
	});
}

function deleteScoreEntry(index: number) {
	update((state) => {
		const scores = state.scores.filter((_, idx) => idx !== index);
		const totals = calculateTotals(scores);
		const past = trimHistory([
			...state.past,
			{ scores: state.scores, totalA: state.totalA, totalB: state.totalB },
		]);

		return {
			...state,
			...totals,
			scores,
			past,
			future: [],
		};
	});
}

function resetScores() {
	update((state) => ({
		...EMPTY_STATE,
		past: trimHistory([
			...state.past,
			{ scores: state.scores, totalA: state.totalA, totalB: state.totalB },
		]),
	}));
}

function undo() {
	update((state) => {
		if (!state.past.length) {
			return state;
		}
		const previous = state.past[state.past.length - 1];
		const past = state.past.slice(0, -1);
		const future = trimHistory([
			...state.future,
			{ scores: state.scores, totalA: state.totalA, totalB: state.totalB },
		]);

		return {
			...state,
			scores: previous.scores,
			totalA: previous.totalA,
			totalB: previous.totalB,
			past,
			future,
		};
	});
}

function redo() {
	update((state) => {
		if (!state.future.length) {
			return state;
		}
		const next = state.future[state.future.length - 1];
		const future = state.future.slice(0, -1);
		const past = trimHistory([
			...state.past,
			{ scores: state.scores, totalA: state.totalA, totalB: state.totalB },
		]);

		return {
			...state,
			scores: next.scores,
			totalA: next.totalA,
			totalB: next.totalB,
			past,
			future,
		};
	});
}

function replaceScores(scores: ScoreEntry[]) {
	update((state) => {
		const normalizedScores = Array.isArray(scores)
			? scores
					.map((entry) => normalizeScoreEntry(entry as Record<string, unknown>))
					.filter((entry): entry is ScoreEntry => Boolean(entry))
			: [];
		const totals = calculateTotals(normalizedScores);
		const past = trimHistory([
			...state.past,
			{ scores: state.scores, totalA: state.totalA, totalB: state.totalB },
		]);

		return {
			...state,
			...totals,
			scores: normalizedScores,
			past,
			future: [],
		};
	});
}

export const scoreStore = {
	subscribe,
	set,
	update,
	addScoreEntry,
	deleteScoreEntry,
	resetScores,
	undo,
	redo,
	replaceScores,
};

export const isGameOver = derived(
	[scoreStore, settingsStore],
	([$score, $settings]) => {
		const limit = $settings.gameLimit;
		return Boolean(
			limit &&
				($score.totalA >= limit || $score.totalB >= limit),
		);
	},
);

export const winnerStore = derived(
	[scoreStore, settingsStore],
	([$score, $settings]) => {
		const limit = $settings.gameLimit;
		if (!limit) {
			return null;
		}
		if ($score.totalA >= limit && $score.totalB >= limit) {
			return "Draft";
		}
		if ($score.totalA >= limit) {
			return $settings.teamA;
		}
		if ($score.totalB >= limit) {
			return $settings.teamB;
		}
		return null;
	},
);
