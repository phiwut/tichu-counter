/**
 * @file French translations for the application.
 */

import type { Translations } from '$lib/translations';

const fr: Translations = {
	settings: {
		title: 'Paramètres',
		game: 'Jeu',
		app: 'App',
		info: 'Info',
		teamAName: 'Nom équipe A',
		teamBName: 'Nom équipe B',
		gameLimit: 'Limite de jeu',
		appTheme: 'Thème',
		language: 'Langue',
		close: 'Fermer',
		save: 'Enregistrer'
	},
	gameControls: {
		addScore: 'Ajouter score',
		reset: 'Réinitialiser',
		confirmReset: 'Voulez-vous vraiment réinitialiser les scores ?',
		yes: 'Oui',
		no: 'Non',
		delete: 'Supprimer',
		tichuLabel: 'Tichu',
		grandTichuLabel: 'Grand Tichu',
		lostTichuLabel: 'Tichu Perdu',
		lostGrandTichuLabel: 'Grand Tichu Perdu',
		doubleWinLabel: 'Double Victoire',
		scoreTeamA: 'Score Équipe A',
		scoreTeamB: 'Score Équipe B'
	},
	languages: {
		en: 'Anglais',
		de: 'Allemand',
		fr: 'Français'
	},
	header: {
		points: 'Points'
	},
	info: {
		description:
			"Cette application est conçue pour vous aider à gérer efficacement vos paramètres de jeu. Pour plus d'informations, visitez notre site web."
	},
	gameComplete: {
		title: 'Partie Terminée',
		winner: 'Le gagnant est {winner}!',
		draft: 'La partie est nulle!',
		newGame: 'Nouveau Jeu',
		close: 'Fermer'
	}
};

export default fr;
