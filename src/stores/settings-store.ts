/**
 * @file Manages the application's settings state.
 */

import {
	DEFAULT_GAME_LIMIT,
	DEFAULT_TEAM_A,
	DEFAULT_TEAM_B
} from '../lib/constants';
import { persistedStore } from '../lib/persisted-store';

export interface Settings {
	teamA: string;
	teamB: string;
	gameLimit: number;
}

const initialSettings: Settings = {
	teamA: DEFAULT_TEAM_A,
	teamB: DEFAULT_TEAM_B,
	gameLimit: DEFAULT_GAME_LIMIT
};

export const settingsStore = persistedStore<Settings>('settingsStore', initialSettings);
