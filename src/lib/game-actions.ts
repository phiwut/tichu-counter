/**
 * @file Canonical mutations for score state.
 */

import type { Round } from './round';
import { scoreStore } from '../stores/score-store';

export function addRound(round: Round): void {
	scoreStore.update((state) => ({
		rounds: [...state.rounds, round]
	}));
}

export function deleteRoundAt(index: number): void {
	scoreStore.update((state) => ({
		rounds: state.rounds.filter((_, i) => i !== index)
	}));
}

export function resetRounds(): void {
	scoreStore.set({ rounds: [] });
}
