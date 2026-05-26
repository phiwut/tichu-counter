/**
 * @file English translations for the application.
 */

import type { Translations } from '$lib/translations';

const en: Translations = {
	settings: {
		title: 'Settings',
		game: 'Game',
		app: 'App',
		info: 'Info',
		teamAName: 'Team A Name',
		teamBName: 'Team B Name',
		gameLimit: 'Game Limit',
		appTheme: 'App Theme',
		language: 'Language',
		close: 'Close',
		save: 'Save'
	},
	gameControls: {
		addScore: 'Add Score',
		reset: 'Reset',
		confirmReset: 'Are you sure you want to reset the scores?',
		yes: 'Yes',
		no: 'No',
		delete: 'Delete',
		tichuLabel: 'Tichu',
		grandTichuLabel: 'Grand Tichu',
		lostTichuLabel: 'Lost Tichu',
		lostGrandTichuLabel: 'Lost Grand Tichu',
		doubleWinLabel: 'Double Win',
		scoreTeamA: 'Score Team A',
		scoreTeamB: 'Score Team B'
	},
	languages: {
		en: 'English',
		de: 'German',
		fr: 'French'
	},
	header: {
		points: 'Points'
	},
	info: {
		description:
			'This application is designed to help you manage your game settings efficiently. For more information, visit our website.'
	},
	gameComplete: {
		title: 'Game Complete',
		winner: 'The winner is {winner}!',
		draft: 'The game is a draw!',
		newGame: 'New Game',
		close: 'Close'
	}
};

export default en;
