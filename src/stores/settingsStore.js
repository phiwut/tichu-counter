import { writable } from 'svelte/store';

function createSettingsStore() {
  let initialSettings = {
    teamA: 'TEAM A',
    teamB: 'TEAM B',
    gameLimit: 1000,
    showWinner: false,
    winner: ''
  };

  if (typeof localStorage !== 'undefined') {
    const storedSettings = localStorage.getItem('settingsStore');
    if (storedSettings) {
      initialSettings = JSON.parse(storedSettings);
    }
  }

  const store = writable(initialSettings);

  store.subscribe((value) => {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('settingsStore', JSON.stringify(value));
    }
  });

  return store;
}

export const settingsStore = createSettingsStore();
