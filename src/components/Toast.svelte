<script lang="ts">
	import { toastStore } from "../stores/toastStore";
	import { fly } from "svelte/transition";
	import { t } from "../lib/translations";
	import { onMount } from "svelte";

	let prefersReducedMotion = false;

	onMount(() => {
		const media = window.matchMedia("(prefers-reduced-motion: reduce)");
		const handleChange = (event) => {
			prefersReducedMotion = event.matches;
		};

		prefersReducedMotion = media.matches;
		media.addEventListener("change", handleChange);

		return () => {
			media.removeEventListener("change", handleChange);
		};
	});
</script>

<div class="toast toast-end toast-top z-50">
	{#each $toastStore as toast (toast.id)}
		<div
			class={`alert shadow-lg alert-${toast.type}`}
			transition:fly={
				prefersReducedMotion
					? { duration: 0 }
					: { x: 20, duration: 200 }
			}
		>
			<div class="flex-1 text-sm">{toast.message}</div>
			<button
				class="btn btn-ghost btn-xs"
				on:click={() => toastStore.removeToast(toast.id)}
				aria-label={$t?.toast?.dismiss || "Dismiss"}
			>
				{$t?.toast?.dismiss || "Dismiss"}
			</button>
		</div>
	{/each}
</div>
