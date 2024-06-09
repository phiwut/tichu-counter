import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

export default {
  kit: {
    adapter: adapter({
      // Define fallback HTML page for dynamic routes
      fallback: 'app.html'
    }),
    prerender: {
      // Pre-render all pages
      entries: ['*']
    }
  },
  preprocess: preprocess({
    postcss: true,
  }),
};
