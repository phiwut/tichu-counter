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
        // Ignore common development assets
        if (
          path.endsWith('.map') || 
          path.includes('workbox-') || 
          path === '/splash.png' || 
          path.startsWith('/assets/')
        ) {
          return;
        }
        // Throw error for other cases
        throw new Error(message);
      }
    },
    serviceWorker: {
      register: false
    }
  },
  preprocess: preprocess({
    postcss: true,
  })
};
