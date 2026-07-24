<script>
  import { base } from '$app/paths';
  import { DEFAULT_OG_IMAGE, DEFAULT_OG_IMAGE_ALT, SITE_NAME, SITE_URL } from '$lib/seo';
  export let data;

  const { lang, slug, page, related, alternateTitles } = data;

  const ui = {
    en: {
      allGuides: 'All guides',
      related: 'Related guides',
      languages: 'Read this in another language',
      ctaTitle: 'Track your Tichu games',
      ctaBody: 'Use the free Tichu Counter to record scores, Tichu calls, and double victories.'
    },
    de: {
      allGuides: 'Alle Guides',
      related: 'Ähnliche Guides',
      languages: 'Diese Seite in einer anderen Sprache',
      ctaTitle: 'Tichu-Partien tracken',
      ctaBody: 'Nutze den kostenlosen Tichu Counter für Punkte, Tichu-Ansagen und Doppelsiege.'
    },
    fr: {
      allGuides: 'Tous les guides',
      related: 'Guides liés',
      languages: 'Lire dans une autre langue',
      ctaTitle: 'Suivre vos parties de Tichu',
      ctaBody: 'Utilisez le compteur gratuit pour les scores, annonces Tichu et doubles victoires.'
    }
  };

  const labels = {
    en: 'English',
    de: 'Deutsch',
    fr: 'Français'
  };

  const copy = ui[lang] || ui.en;

  const alternates = Object.entries(alternateTitles)
    .filter(([code, title]) => title)
    .map(([code, title]) => ({ code, title }));

  const otherLanguages = alternates.filter((item) => item.code !== lang);
  const canonicalUrl = `${SITE_URL}/${lang}/guide/${slug}`;
</script>

<svelte:head>
  <title>{page.title}</title>
  <meta name="description" content={page.metaDescription} />
  <link rel="canonical" href={canonicalUrl} />
  <meta name="robots" content="index, follow" />
  <meta property="og:site_name" content={SITE_NAME} />
  <meta property="og:title" content={page.title} />
  <meta property="og:description" content={page.metaDescription} />
  <meta property="og:type" content="article" />
  <meta property="og:url" content={canonicalUrl} />
  <meta property="og:image" content={DEFAULT_OG_IMAGE} />
  <meta property="og:image:alt" content={DEFAULT_OG_IMAGE_ALT} />
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:title" content={page.title} />
  <meta name="twitter:description" content={page.metaDescription} />
  <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />
  {#each alternates as alternate}
    <link rel="alternate" hreflang={alternate.code} href={`${SITE_URL}/${alternate.code}/guide/${slug}`} />
  {/each}
  <link rel="alternate" hreflang="x-default" href={`${SITE_URL}/en/guide/${slug}`} />
  <html lang={lang} />
</svelte:head>

<main class="min-h-screen bg-base-100 text-base-content">
  <div class="max-w-3xl mx-auto px-6 py-10">
    <div class="text-sm breadcrumbs mb-6">
      <ul>
        <li><a href={`${base}/`}>Tichu Counter</a></li>
        <li><a href={`${base}/${lang}/guide`}>{copy.allGuides}</a></li>
        <li>{page.h1}</li>
      </ul>
    </div>

    <header class="space-y-3">
      <h1 class="text-3xl font-bold">{page.h1}</h1>
      <p class="text-lg text-base-content/80">{page.intro}</p>
    </header>

    <div class="mt-8 space-y-8">
      {#each page.sections as section}
        <section class="space-y-2">
          <h2 class="text-xl font-semibold">{section.heading}</h2>
          <p class="text-base leading-relaxed text-base-content/80">{section.content}</p>
        </section>
      {/each}
    </div>

    <section class="mt-10 bg-base-200 rounded-lg p-6">
      <h2 class="text-xl font-semibold">{copy.ctaTitle}</h2>
      <p class="text-sm text-base-content/70 mt-2">{copy.ctaBody}</p>
      <a class="btn btn-primary mt-4" href={`${base}/`}>Tichu Counter</a>
    </section>

    {#if related.length}
      <section class="mt-10">
        <h2 class="text-lg font-semibold">{copy.related}</h2>
        <div class="mt-4 grid gap-3 sm:grid-cols-2">
          {#each related as rel}
            <a
              class="card bg-base-200 shadow hover:shadow-md transition"
              href={`${base}/${lang}/guide/${rel.slug}`}
            >
              <div class="card-body">
                <h3 class="card-title text-base">{rel.title}</h3>
                <p class="text-xs text-base-content/70">{rel.metaDescription}</p>
              </div>
            </a>
          {/each}
        </div>
      </section>
    {/if}

    {#if otherLanguages.length}
      <section class="mt-10">
        <h2 class="text-lg font-semibold">{copy.languages}</h2>
        <div class="mt-3 flex flex-wrap gap-2">
          {#each otherLanguages as item}
            <a class="btn btn-outline btn-sm" href={`${base}/${item.code}/guide/${slug}`}>
              {labels[item.code] || item.code}
            </a>
          {/each}
        </div>
      </section>
    {/if}
  </div>
</main>
