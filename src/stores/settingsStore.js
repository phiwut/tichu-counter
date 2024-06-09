import { writable } from 'svelte/store';

export const settingsStore = writable({
  teamA: 'TEAM A',
  teamB: 'TEAM B',
  gameLimit: 500,
  showWinner: false,
  winner: ''
});
