<script>
  import { onMount } from 'svelte';

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

<div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
  <h1 class="text-4xl font-bold mb-4">Tichu Counter</h1>
  {#if online}
    <p class="text-xl mb-4">You are back online!</p>
    <button
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      on:click={reloadPage}
    >
      Reload Page
    </button>
  {:else}
    <p class="text-xl mb-4">You are currently offline.</p>
    <p class="text-lg mb-4">Please check your internet connection and try again.</p>
  {/if}
</div>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
  }
</style>