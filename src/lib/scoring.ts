/**
 * @file Pure scoring logic for a Tichu round.
 */

import { type Round, type TeamFlags, type TeamId } from './round';

export interface RoundInput {
	baseA: number;
	baseB: number;
	flags: Record<TeamId, TeamFlags>;
}

function applyFlagModifiers(points: number, flags: TeamFlags): number {
	let total = points;
	if (flags.tichu) total += 100;
	if (flags.grand) total += 200;
	if (flags.lostTichu) total -= 100;
	if (flags.lostGrand) total -= 200;
	return total;
}

/**
 * Computes final round points from base trick scores and per-team flags.
 */
export function computeRoundPoints(input: RoundInput): Round {
	let baseA = input.baseA;
	let baseB = input.baseB;

	if (input.flags.A.doubleWin) {
		baseA = 200;
		baseB = 0;
	} else if (input.flags.B.doubleWin) {
		baseB = 200;
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
