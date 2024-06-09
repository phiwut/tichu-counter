import { writable } from 'svelte/store';

export const scoreStore = writable({
  totalA: 0,
  totalB: 0,
  scores: []
});
