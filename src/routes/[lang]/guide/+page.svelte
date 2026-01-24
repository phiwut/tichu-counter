<script>
  export let data;

  const { lang, meta, pages } = data;

  const ui = {
    en: {
      allGuides: 'Tichu Guide',
      intro: 'Browse the complete Tichu guide. Each page links to related topics so you can go deep fast.',
      cta: 'Use the free Tichu Counter',
      ctaNote: 'Track scores and special calls while you play.'
    },
    de: {
      allGuides: 'Tichu Leitfaden',
      intro: 'Stöbere im vollständigen Tichu-Leitfaden. Jede Seite verlinkt zu passenden Themen für schnellen Überblick.',
      cta: 'Kostenlosen Tichu Counter nutzen',
      ctaNote: 'Punkte und Spezialansagen beim Spielen tracken.'
    },
    fr: {
      allGuides: 'Guide du Tichu',
      intro: 'Parcourez le guide complet du Tichu. Chaque page renvoie à des sujets liés pour approfondir rapidement.',
      cta: 'Utiliser le compteur de Tichu',
      ctaNote: 'Suivez les scores et les annonces pendant la partie.'
    }
  };

  const copy = ui[lang] || ui.en;
</script>

<svelte:head>
  <title>{meta.title}</title>
  <meta name="description" content={meta.description} />
  <html lang={lang} />
</svelte:head>

<main class="min-h-screen bg-base-100 text-base-content">
  <div class="max-w-5xl mx-auto px-6 py-10">
    <div class="text-sm breadcrumbs mb-6">
      <ul>
        <li><a href="/">Tichu Counter</a></li>
        <li>{copy.allGuides}</li>
      </ul>
    </div>

    <header class="space-y-3">
      <h1 class="text-3xl font-bold">{meta.title}</h1>
      <p class="text-lg text-base-content/80">{copy.intro}</p>
    </header>

    <section class="mt-8 grid gap-4 sm:grid-cols-2">
      {#each pages as page}
        <a
          class="card bg-base-200 shadow hover:shadow-md transition"
          href={`/${lang}/guide/${page.slug}`}
        >
          <div class="card-body">
            <h2 class="card-title text-lg">{page.title}</h2>
            <p class="text-sm text-base-content/70">{page.metaDescription}</p>
          </div>
        </a>
      {/each}
    </section>

    <section class="mt-10 bg-base-200 rounded-lg p-6">
      <h2 class="text-xl font-semibold">{copy.cta}</h2>
      <p class="text-sm text-base-content/70 mt-1">{copy.ctaNote}</p>
      <a class="btn btn-primary mt-4" href="/">Tichu Counter</a>
    </section>
  </div>
</main>
