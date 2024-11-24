<script>
	import { page } from "$app/stores";
</script>

<div class="flex flex-col items-center justify-center min-h-screen p-4">
	<h1 class="text-4xl font-bold mb-4">
		{#if $page.status === 404}
			Page not found
		{:else}
			An error occurred
		{/if}
	</h1>

	<p class="text-xl mb-4">
		{#if navigator.onLine}
			Please try again later or return to the home page.
		{:else}
			You appear to be offline. Please check your internet connection.
		{/if}
	</p>

	<a href="/" class="btn btn-primary">Return to Home</a>
</div>
