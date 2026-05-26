import { describe, expect, it } from 'vitest';
import { resolveGameStatus } from './game-status';

describe('resolveGameStatus', () => {
	const teamA = 'Alpha';
	const teamB = 'Beta';
	const limit = 1000;

	it('returns incomplete below limit', () => {
		expect(resolveGameStatus(500, 400, limit, teamA, teamB)).toEqual({
			isComplete: false,
			outcome: null
		});
	});

	it('declares draw when both reach limit', () => {
		expect(resolveGameStatus(1000, 1000, limit, teamA, teamB)).toEqual({
			isComplete: true,
			outcome: 'draw'
		});
	});

	it('declares first team over limit', () => {
		expect(resolveGameStatus(1000, 900, limit, teamA, teamB)).toEqual({
			isComplete: true,
			outcome: { name: teamA }
		});
	});
});
