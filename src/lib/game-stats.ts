/**
 * @file Pure statistics helpers for completed games.
 */

import type { Round, TeamId } from './round';

export function calculateTichuSuccess(rounds: Round[], team: TeamId): number {
	const flags = (round: Round) => round.flags[team];
	const attempts = rounds.filter((r) => flags(r).tichu || flags(r).grand).length;
	const successes = rounds.filter(
		(r) => (flags(r).tichu && !flags(r).lostTichu) || (flags(r).grand && !flags(r).lostGrand)
	).length;
	return attempts === 0 ? 0 : Math.round((successes / attempts) * 100);
}

export function countSpecialMoves(
	rounds: Round[],
	team: TeamId,
	type: 'tichu' | 'grand' | 'doubleWin'
): number {
	const flags = (round: Round) => round.flags[team];
	switch (type) {
		case 'tichu':
			return rounds.filter((r) => flags(r).tichu).length;
		case 'grand':
			return rounds.filter((r) => flags(r).grand).length;
		case 'doubleWin':
			return rounds.filter((r) => flags(r).doubleWin).length;
	}
}
