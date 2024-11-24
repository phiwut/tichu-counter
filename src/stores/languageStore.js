import { writable } from 'svelte/store';

function createLanguageStore() {
  const browserLang = typeof navigator !== 'undefined' 
    ? (navigator.language || navigator.userLanguage).split('-')[0]
    : 'de';
  
  const initialLang = ['de', 'en', 'fr'].includes(browserLang) ? browserLang : 'de';

  let initialSettings = {
    language: initialLang
  };

  if (typeof localStorage !== 'undefined') {
    const storedLang = localStorage.getItem('languageStore');
    if (storedLang) {
      initialSettings = JSON.parse(storedLang);
    }
  }

  const store = writable(initialSettings);

  store.subscribe((value) => {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('languageStore', JSON.stringify(value));
    }
  });

  return store;
}

export const languageStore = createLanguageStore(); 