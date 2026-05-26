/**
 * @file Manages round history (single source of truth; totals are derived).
 */

import { derived, type Readable } from 'svelte/store';
import { persistedStore } from '../lib/persisted-store';
import { migrateLegacyRound, sumTeamPoints, type LegacyRound, type Round } from '../lib/round';

export type { Round, TeamId, TeamFlags } from '../lib/round';
export { emptyTeamFlags, emptyRoundInput } from '../lib/round';

export interface ScoreState {
	rounds: Round[];
}

interface LegacyScoreState {
	scores?: LegacyRound[];
	rounds?: Round[];
	totalA?: number;
	totalB?: number;
}

function parseScoreState(raw: unknown): ScoreState {
	const empty: ScoreState = { rounds: [] };
	if (!raw || typeof raw !== 'object') return empty;

	const data = raw as LegacyScoreState;
	if (Array.isArray(data.rounds)) {
		return { rounds: data.rounds };
	}
	if (Array.isArray(data.scores)) {
		return { rounds: data.scores.map(migrateLegacyRound) };
	}
	return empty;
}

export const scoreStore = persistedStore<ScoreState>('scoreStore', { rounds: [] }, parseScoreState);

export const totals: Readable<{ totalA: number; totalB: number }> = derived(scoreStore, ($state) => ({
	totalA: sumTeamPoints($state.rounds, 'A'),
	totalB: sumTeamPoints($state.rounds, 'B')
}));
