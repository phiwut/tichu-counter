import { writable } from 'svelte/store';

function createTeamStore() {
  let initialTeams = {
    teamA: 'TEAM A',
    teamB: 'TEAM B'
  };

  if (typeof localStorage !== 'undefined') {
    const storedTeams = localStorage.getItem('teamStore');
    if (storedTeams) {
      initialTeams = JSON.parse(storedTeams);
    }
  }

  const store = writable(initialTeams);

  store.subscribe((value) => {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('teamStore', JSON.stringify(value));
    }
  });

  return store;
}

export const teamStore = createTeamStore();
