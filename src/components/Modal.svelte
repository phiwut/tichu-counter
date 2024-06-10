<script>
	export let show = false;
	export let title;
</script>

{#if show}
	<dialog class="modal" open>
		<div class="modal-box">
			<h2 class="font-bold text-xl">{title}</h2>
			<slot name="content"></slot>
			<div class="modal-action">
				<slot name="actions"></slot>
			</div>
		</div>
	</dialog>
{/if}
