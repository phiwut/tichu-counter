import { derived } from "svelte/store";
import { languageStore } from "../stores/languageStore";

const translations = {
  de: () => import("../translations/de.ts"),
  en: () => import("../translations/en.ts"),
  fr: () => import("../translations/fr.ts")
};

export const t = derived(
  languageStore,
  ($languageStore, set) => {
    translations[$languageStore.language]().then((module) =>
      set(module.default),
    );
  },
);
