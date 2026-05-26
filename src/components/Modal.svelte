<script lang="ts">
	import { tick } from 'svelte';

	export let show = false;
	export let title: string;
	export let onClose = () => {};
	export let closeOnEsc = true;

	let dialog: HTMLDialogElement | null = null;
	let previousActive: Element | null = null;

	function getFocusableElements() {
		if (!dialog) {
			return [];
		}
		return Array.from(
			dialog.querySelectorAll(
				'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
			)
		);
	}

	async function focusModal() {
		await tick();
		if (!dialog) {
			return;
		}
		previousActive = document.activeElement;
		const focusable = getFocusableElements();
		if (focusable.length) {
			focusable[0].focus();
		} else {
			dialog.focus();
		}
	}

	function restoreFocus() {
		if (previousActive && typeof previousActive.focus === 'function') {
			previousActive.focus();
		}
		previousActive = null;
	}

	function handleKeydown(event: KeyboardEvent) {
		if (closeOnEsc && event.key === 'Escape') {
			onClose();
		}
		if (event.key !== 'Tab') {
			return;
		}
		const focusable = getFocusableElements();
		if (!focusable.length) {
			return;
		}
		const first = focusable[0];
		const last = focusable[focusable.length - 1];
		if (event.shiftKey && document.activeElement === first) {
			event.preventDefault();
			last.focus();
		} else if (!event.shiftKey && document.activeElement === last) {
			event.preventDefault();
			first.focus();
		}
	}

	$: if (show) {
		focusModal();
	} else {
		restoreFocus();
	}
</script>

{#if show}
	<dialog class="modal" open bind:this={dialog} tabindex="-1" on:keydown={handleKeydown}>
		<div class="modal-box">
			<h2 class="font-bold text-xl">{title}</h2>
			<slot name="content"></slot>
			<div class="modal-action">
				<slot name="actions"></slot>
			</div>
		</div>
	</dialog>
{/if}
