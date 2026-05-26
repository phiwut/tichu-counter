import { describe, expect, it } from 'vitest';
import { emptyTeamFlags } from './round';
import { computeRoundPoints } from './scoring';

describe('computeRoundPoints', () => {
	it('applies tichu bonus', () => {
		const round = computeRoundPoints({
			baseA: 50,
			baseB: 50,
			flags: {
				A: { ...emptyTeamFlags(), tichu: true },
				B: emptyTeamFlags()
			}
		});
		expect(round.points.A).toBe(150);
		expect(round.points.B).toBe(50);
	});

	it('applies double win base before modifiers', () => {
		const round = computeRoundPoints({
			baseA: 50,
			baseB: 50,
			flags: {
				A: { ...emptyTeamFlags(), doubleWin: true, tichu: true },
				B: emptyTeamFlags()
			}
		});
		expect(round.points.A).toBe(300);
		expect(round.points.B).toBe(0);
	});
});
