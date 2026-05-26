/**
 * @file German translations for the application.
 */

import type { Translations } from '$lib/translations';

const de: Translations = {
	settings: {
		title: 'Einstellungen',
		game: 'Spiel',
		app: 'App',
		info: 'Info',
		teamAName: 'Team A Name',
		teamBName: 'Team B Name',
		gameLimit: 'Spiellimit',
		appTheme: 'App-Theme',
		language: 'Sprache',
		close: 'Schliessen',
		save: 'Speichern'
	},
	gameControls: {
		addScore: 'Punkte hinzufügen',
		reset: 'Zurücksetzen',
		confirmReset: 'Möchten Sie wirklich alle Punkte zurücksetzen?',
		yes: 'Ja',
		no: 'Nein',
		delete: 'Löschen',
		tichuLabel: 'Tichu',
		grandTichuLabel: 'Grosses Tichu',
		lostTichuLabel: 'Verlorenes Tichu',
		lostGrandTichuLabel: 'Verlorenes Grosses Tichu',
		doubleWinLabel: 'Doppelsieg',
		scoreTeamA: 'Punkte Team A',
		scoreTeamB: 'Punkte Team B'
	},
	languages: {
		en: 'Englisch',
		de: 'Deutsch',
		fr: 'Französisch'
	},
	header: {
		points: 'Punkte'
	},
	info: {
		description:
			'Diese Anwendung wurde entwickelt, um Ihre Spieleinstellungen effizient zu verwalten. Für weitere Informationen besuchen Sie unsere Website.'
	},
	gameComplete: {
		title: 'Spiel beendet',
		winner: 'Der Gewinner ist {winner}!',
		draft: 'Das Spiel ist unentschieden!',
		newGame: 'Neues Spiel',
		close: 'Schliessen'
	}
};

export default de;
