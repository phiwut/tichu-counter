import { guidePages } from './guideContent.js';
import { guidePages2 } from './guideContent2.js';
import { guidePages3 } from './guideContent3.js';

export const guideLanguages = ['en', 'de', 'fr'];

export const guidePagesAll = {
  ...guidePages,
  ...guidePages2,
  ...guidePages3
};

export const guideOrder = [
  'what-is-tichu',
  'tichu-rules-overview',
  'tichu-setup-and-dealing',
  'tichu-card-passing-strategy',
  'tichu-card-combinations',
  'tichu-special-cards',
  'tichu-trick-taking-basics',
  'tichu-mah-jong-wish',
  'tichu-bomb-strategy',
  'tichu-hand-evaluation',
  'tichu-calling-strategy',
  'tichu-grand-tichu-guide',
  'tichu-strategy-tips',
  'tichu-advanced-tactics',
  'tichu-endgame-strategy',
  'tichu-double-victory',
  'tichu-scoring-system',
  'tichu-scoring-examples',
  'tichu-common-mistakes',
  'tichu-variants-house-rules',
  'tichu-first-game-checklist',
  'tichu-partnership-communication'
];

export const guideHubMeta = {
  en: {
    title: 'Tichu Guide: Rules, Strategy, and Scoring',
    description: 'Explore a complete Tichu guide with rules, special cards, scoring, and strategy. Browse 20+ detailed articles in English.'
  },
  de: {
    title: 'Tichu Leitfaden: Regeln, Strategie und Punkte',
    description: 'Entdecke den vollständigen Tichu-Leitfaden mit Regeln, Spezialkarten, Punkten und Strategie. Über 20 detaillierte Artikel auf Deutsch.'
  },
  fr: {
    title: 'Guide du Tichu: Règles, Stratégie et Score',
    description: 'Découvrez un guide complet du Tichu avec règles, cartes spéciales, score et stratégie. Plus de 20 articles détaillés en français.'
  }
};

export function getGuidePage(slug, lang) {
  const entry = guidePagesAll[slug];
  if (!entry) return null;
  return entry[lang] || entry.en;
}

export function getGuideList(lang) {
  return guideOrder
    .map((slug) => {
      const entry = getGuidePage(slug, lang);
      if (!entry) return null;
      return {
        slug,
        title: entry.title,
        metaDescription: entry.metaDescription,
        h1: entry.h1
      };
    })
    .filter(Boolean);
}
