<script lang="ts">
	export let type: "info" | "success" | "warning" | "error" = "info";
	export let label = "";
	export let icon = "";
	export let show = false;
</script>

{#if show}
	<span
		class={`badge badge-${type} text-${type}-content inline-flex items-center gap-1`}
		aria-label={label}
		title={label}
	>
		{#if icon}
			<span class="badge-icon" aria-hidden="true">{icon}</span>
		{/if}
		<span class="badge-text">{label}</span>
	</span>
{/if}

<style>
	.badge-icon {
		font-size: 0.65rem;
		font-weight: 700;
		line-height: 1;
		border: 1px solid currentColor;
		border-radius: 999px;
		padding: 0.1rem 0.35rem;
	}

	.badge-text {
		letter-spacing: 0.02em;
	}
</style>
