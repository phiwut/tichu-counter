import { writable } from 'svelte/store';

export const teamStore = writable({
  teamA: 'TEAM A',
  teamB: 'TEAM B'
});
