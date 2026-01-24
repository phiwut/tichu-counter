import { error } from '@sveltejs/kit';
import { guideLanguages, getGuideList, guideHubMeta } from '$lib/guideData.js';

export const prerender = true;

export const entries = () => guideLanguages.map((lang) => ({ lang }));

export function load({ params }) {
  const { lang } = params;
  if (!guideLanguages.includes(lang)) {
    throw error(404, 'Not found');
  }

  return {
    lang,
    meta: guideHubMeta[lang] || guideHubMeta.en,
    pages: getGuideList(lang)
  };
}
