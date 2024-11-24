import { derived } from 'svelte/store';
import { languageStore } from '../stores/languageStore';

const translations = {
  de: () => import('../translations/de.js'),
  en: () => import('../translations/en.js'),
  fr: () => import('../translations/fr.js')
};

export const t = derived(
  languageStore,
  ($languageStore, set) => {
    translations[$languageStore.language]()
      .then(module => set(module.default));
  }
); 