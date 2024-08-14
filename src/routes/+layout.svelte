<script context="module">
	export const prerender = true;
</script>

<script>
	import "../global.css";
	import ReloadPrompt from "$lib/ReloadPrompt.svelte";
</script>

<slot />
<ReloadPrompt />
