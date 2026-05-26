/**
 * @file Derived game completion status from scores and settings.
 */

import { derived, type Readable } from 'svelte/store';
import { scoreStore, totals } from '../stores/score-store';
import { settingsStore } from '../stores/settings-store';

export type GameOutcome = 'draw' | { name: string };

export interface GameStatus {
	isComplete: boolean;
	outcome: GameOutcome | null;
}

/**
 * Resolves whether the game is over and who won.
 */
export function resolveGameStatus(
	totalA: number,
	totalB: number,
	gameLimit: number,
	teamA: string,
	teamB: string
): GameStatus {
	if (totalA >= gameLimit && totalB >= gameLimit) {
		return { isComplete: true, outcome: 'draw' };
	}
	if (totalA >= gameLimit) {
		return { isComplete: true, outcome: { name: teamA } };
	}
	if (totalB >= gameLimit) {
		return { isComplete: true, outcome: { name: teamB } };
	}
	return { isComplete: false, outcome: null };
}

export const gameStatus: Readable<GameStatus> = derived(
	[totals, settingsStore],
	([$totals, $settings]) =>
		resolveGameStatus($totals.totalA, $totals.totalB, $settings.gameLimit, $settings.teamA, $settings.teamB)
);
