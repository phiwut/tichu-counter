/**
 * @file Pure scoring logic for a Tichu round.
 */

import {
	BASE_SCORE_TOTAL,
	DOUBLE_WIN_POINTS,
	GRAND_TICHU_BONUS,
	SCORE_BOUNDS,
	TICHU_BONUS
} from './constants';
import { type Round, type TeamFlags, type TeamId } from './round';

export interface RoundInput {
	baseA: number;
	baseB: number;
	flags: Record<TeamId, TeamFlags>;
}

function applyFlagModifiers(points: number, flags: TeamFlags): number {
	let total = points;
	if (flags.tichu) total += TICHU_BONUS;
	if (flags.grand) total += GRAND_TICHU_BONUS;
	if (flags.lostTichu) total -= TICHU_BONUS;
	if (flags.lostGrand) total -= GRAND_TICHU_BONUS;
	return total;
}

/**
 * Computes final round points from base trick scores and per-team flags.
 */
export function computeRoundPoints(input: RoundInput): Round {
	let baseA = input.baseA;
	let baseB = input.baseB;

	if (input.flags.A.doubleWin) {
		baseA = DOUBLE_WIN_POINTS;
		baseB = 0;
	} else if (input.flags.B.doubleWin) {
		baseB = DOUBLE_WIN_POINTS;
		baseA = 0;
	}

	return {
		points: {
			A: applyFlagModifiers(baseA, input.flags.A),
			B: applyFlagModifiers(baseB, input.flags.B)
		},
		flags: {
			A: { ...input.flags.A },
			B: { ...input.flags.B }
		}
	};
}

export function clampTrickScore(value: number): number {
	return Math.max(SCORE_BOUNDS.MIN, Math.min(SCORE_BOUNDS.MAX, value));
}

export function oppositeTrickScore(value: number): number {
	return BASE_SCORE_TOTAL - value;
}
