import { guideLanguages, guideOrder } from '$lib/guideData.js';
import { SITE_URL } from '$lib/seo';

export const prerender = true;

const staticUrls = [
  '',
  ...guideLanguages.map((lang) => `/${lang}/guide`),
  ...guideLanguages.flatMap((lang) =>
    guideOrder.map((slug) => `/${lang}/guide/${slug}`)
  )
];

const toUrlEntry = (path: string) => {
  const loc = path ? `${SITE_URL}${path}` : `${SITE_URL}/`;
  return `  <url><loc>${loc}</loc></url>`;
};

export const GET = () => {
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticUrls.map(toUrlEntry).join('\n')}
</urlset>`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml'
    }
  });
};
