import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

export default {
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: 'index.html',
      precompress: false,
      strict: true
    }),
    prerender: {
      handleMissingId: 'ignore',
      handleHttpError: ({ path, referrer, message }) => {
        // Ignore missing splash.png and other assets
        if (path === '/splash.png' || path.startsWith('/assets/')) {
          return;
        }
        // Throw error for other cases
        throw new Error(message);
      }
    }
  },
  preprocess: preprocess({
    postcss: true,
  })
};
