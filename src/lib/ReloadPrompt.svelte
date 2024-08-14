<!--
  @component
  This component handles the Progressive Web App (PWA) update functionality.
  It displays a prompt to the user when a new version of the app is available
  or when the app is ready for offline use.

  Features:
  - Registers and manages the service worker for PWA functionality
  - Displays a toast notification for app updates and offline readiness
  - Provides options to reload the app with new content or dismiss the notification
  - Handles offline readiness notification
-->

<script>
  import { onMount } from 'svelte';
  import { registerSW } from 'virtual:pwa-register';

  let needRefresh = false;
  let offlineReady = false;
  let updateServiceWorker;

  onMount(() => {
    console.log('ReloadPrompt: Registering service worker');
    updateServiceWorker = registerSW({
      onNeedRefresh() {
        console.log('ReloadPrompt: New content available, refresh needed');
        needRefresh = true;
      },
      onOfflineReady() {
        console.log('ReloadPrompt: App ready for offline use');
        offlineReady = true;
      },
      onRegistered(r) {
        console.log('ReloadPrompt: Service worker registered');
        r && r.update();
      },
      onRegisterError(error) {
        console.error('ReloadPrompt: Service worker registration error', error);
      },
    });
  });

  /**
   * Closes the update prompt
   */
  function close() {
    offlineReady = false;
    needRefresh = false;
  }

  /**
   * Triggers the service worker update and reloads the page
   */
  function updateSW() {
    console.log('ReloadPrompt: Updating service worker');
    needRefresh = false;
    updateServiceWorker(true);
  }
</script>

{#if offlineReady || needRefresh}
  <div class="pwa-toast" role="alert">
    <div class="message">
      {#if offlineReady}
        <span>App ready to work offline</span>
      {:else}
        <span>New content available, click on reload button to update.</span>
      {/if}
    </div>
    {#if needRefresh}
      <button on:click={updateSW}>Reload</button>
    {/if}
    <button on:click={close}>Close</button>
  </div>
{/if}

<style>
  .pwa-toast {
    position: fixed;
    right: 0;
    bottom: 0;
    margin: 16px;
    padding: 12px;
    border: 1px solid #8885;
    border-radius: 4px;
    z-index: 1;
    text-align: left;
    box-shadow: 3px 4px 5px 0 #8885;
    background-color: white;
  }
  .pwa-toast .message {
    margin-bottom: 8px;
  }
  .pwa-toast button {
    border: 1px solid #8885;
    outline: none;
    margin-right: 5px;
    border-radius: 2px;
    padding: 3px 10px;
  }
</style>