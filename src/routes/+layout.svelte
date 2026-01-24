<script lang="ts">
	import "../global.css";
	import ReloadPrompt from "$lib/ReloadPrompt.svelte";
	import Toast from "../components/Toast.svelte";
</script>

<slot />
<ReloadPrompt />
<Toast />
