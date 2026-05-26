/**
 * @file Manages the application's settings state.
 */

import { persistedStore } from '../lib/persisted-store';

export interface Settings {
	teamA: string;
	teamB: string;
	gameLimit: number;
}

const initialSettings: Settings = {
	teamA: 'TEAM A',
	teamB: 'TEAM B',
	gameLimit: 1000
};

export const settingsStore = persistedStore<Settings>('settingsStore', initialSettings);
