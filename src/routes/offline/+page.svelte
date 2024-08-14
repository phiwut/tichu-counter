<script>
  import { onMount } from 'svelte';

  let isOnline = true;

  onMount(() => {
    isOnline = navigator.onLine;
    window.addEventListener('online', () => isOnline = true);
    window.addEventListener('offline', () => isOnline = false);
  });
</script>

<svelte:head>
  <title>Offline - Tichu.xyz</title>
</svelte:head>

<div class="flex flex-col items-center justify-center h-screen bg-gray-100">
  <h1 class="text-4xl font-bold mb-4">You're Offline</h1>
  <p class="text-xl mb-8">Please check your internet connection and try again.</p>
  {#if isOnline}
    <a href="/" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      Reload
    </a>
  {:else}
    <button class="bg-gray-500 text-white font-bold py-2 px-4 rounded cursor-not-allowed" disabled>
      Waiting for connection...
    </button>
  {/if}
</div>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
  }
</style>