import { describe, expect, it } from 'vitest';
import { migrateLegacyRound } from './round';

describe('migrateLegacyRound', () => {
	it('maps legacy flat fields to round shape', () => {
		const round = migrateLegacyRound({
			scoreA: 150,
			scoreB: 50,
			tichuA: true,
			lostTichuB: true,
			doubleWinA: false
		});
		expect(round.points).toEqual({ A: 150, B: 50 });
		expect(round.flags.A.tichu).toBe(true);
		expect(round.flags.B.lostTichu).toBe(true);
	});
});
