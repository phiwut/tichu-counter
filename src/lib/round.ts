/**
 * @file Domain types for a single Tichu scoring round.
 */

export type TeamId = 'A' | 'B';

export interface TeamFlags {
	tichu: boolean;
	grand: boolean;
	lostTichu: boolean;
	lostGrand: boolean;
	doubleWin: boolean;
}

export interface Round {
	points: Record<TeamId, number>;
	flags: Record<TeamId, TeamFlags>;
}

export function emptyTeamFlags(): TeamFlags {
	return {
		tichu: false,
		grand: false,
		lostTichu: false,
		lostGrand: false,
		doubleWin: false
	};
}

export function emptyRoundInput(): Record<TeamId, TeamFlags> {
	return { A: emptyTeamFlags(), B: emptyTeamFlags() };
}

/** @deprecated Legacy persisted shape — migrated on load. */
export interface LegacyRound {
	scoreA?: number;
	scoreB?: number;
	teamA?: number;
	teamB?: number;
	tichuA?: boolean;
	tichuB?: boolean;
	grandA?: boolean;
	grandB?: boolean;
	lostTichuA?: boolean;
	lostTichuB?: boolean;
	lostGrandA?: boolean;
	lostGrandB?: boolean;
	doubleWinA?: boolean;
	doubleWinB?: boolean;
}

export function migrateLegacyRound(legacy: LegacyRound): Round {
	const flags = emptyRoundInput();
	flags.A = {
		tichu: !!legacy.tichuA,
		grand: !!legacy.grandA,
		lostTichu: !!legacy.lostTichuA,
		lostGrand: !!legacy.lostGrandA,
		doubleWin: !!legacy.doubleWinA
	};
	flags.B = {
		tichu: !!legacy.tichuB,
		grand: !!legacy.grandB,
		lostTichu: !!legacy.lostTichuB,
		lostGrand: !!legacy.lostGrandB,
		doubleWin: !!legacy.doubleWinB
	};
	return {
		points: {
			A: legacy.scoreA ?? legacy.teamA ?? 0,
			B: legacy.scoreB ?? legacy.teamB ?? 0
		},
		flags
	};
}

export function sumTeamPoints(rounds: Round[], team: TeamId): number {
	return rounds.reduce((acc, round) => acc + round.points[team], 0);
}
