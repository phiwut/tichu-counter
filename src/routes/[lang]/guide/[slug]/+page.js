import { error } from '@sveltejs/kit';
import {
  guideLanguages,
  guideOrder,
  getGuidePage,
  guidePagesAll
} from '$lib/guideData.js';

export const prerender = true;

export const entries = () =>
  guideLanguages.flatMap((lang) => guideOrder.map((slug) => ({ lang, slug })));

export function load({ params }) {
  const { lang, slug } = params;

  if (!guideLanguages.includes(lang)) {
    throw error(404, 'Not found');
  }

  const page = getGuidePage(slug, lang);
  if (!page) {
    throw error(404, 'Not found');
  }

  const related = (page.relatedPages || [])
    .map((relatedSlug) => {
      const relatedPage = getGuidePage(relatedSlug, lang);
      if (!relatedPage) return null;
      return {
        slug: relatedSlug,
        title: relatedPage.title,
        metaDescription: relatedPage.metaDescription
      };
    })
    .filter(Boolean);

  const allTitles = guidePagesAll[slug] || {};

  return {
    lang,
    slug,
    page,
    related,
    alternateTitles: {
      en: allTitles.en?.title,
      de: allTitles.de?.title,
      fr: allTitles.fr?.title
    }
  };
}
