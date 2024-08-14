<!--
  @component
  This component represents a reusable modal dialog for the Tichu scoring application.
  It provides a flexible structure for displaying various types of modal content.

  Props:
  - show: A boolean to control the visibility of the modal
  - title: The title text to be displayed at the top of the modal

  Slots:
  - content: The main content of the modal
  - actions: The action buttons or links at the bottom of the modal

  Features:
  - Conditional rendering based on the 'show' prop
  - Customizable title
  - Flexible content and action areas using named slots
  - Styling using Tailwind CSS classes
-->

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
