import { writable } from 'svelte/store';

function createScoreStore() {
  let initialScore = {
    totalA: 0,
    totalB: 0,
    scores: []
  };

  if (typeof localStorage !== 'undefined') {
    const storedScore = localStorage.getItem('scoreStore');
    if (storedScore) {
      initialScore = JSON.parse(storedScore);
    }
  }

  const store = writable(initialScore);

  store.subscribe((value) => {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('scoreStore', JSON.stringify(value));
    }
  });

  return store;
}

export const scoreStore = createScoreStore();
