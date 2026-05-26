<script lang="ts">
  import { onMount } from 'svelte';
  import { t } from '../../lib/translations';
  import { SITE_NAME, SITE_URL } from '$lib/seo';

  let online = true;

  onMount(() => {
    online = navigator.onLine;
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  });

  function handleOnline() {
    online = true;
  }

  function handleOffline() {
    online = false;
  }

  function reloadPage() {
    window.location.reload();
  }
</script>

<svelte:head>
  <title>Offline - {SITE_NAME}</title>
  <meta
    name="description"
    content="You are offline. Check your internet connection to keep using Tichu Counter."
  />
  <meta name="robots" content="noindex, nofollow" />
  <link rel="canonical" href={`${SITE_URL}/offline`} />
</svelte:head>

<div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
  <h1 class="text-4xl font-bold mb-4">{$t?.offline?.title || "Tichu Counter"}</h1>
  {#if online}
    <p class="text-xl mb-4">{$t?.offline?.backOnline || "You are back online!"}</p>
    <button
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      on:click={reloadPage}
    >
      {$t?.offline?.reload || "Reload Page"}
    </button>
  {:else}
    <p class="text-xl mb-4">{$t?.offline?.offline || "You are currently offline."}</p>
    <p class="text-lg mb-4">{$t?.offline?.instructions || "Please check your internet connection and try again."}</p>
  {/if}
</div>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
  }
</style>
