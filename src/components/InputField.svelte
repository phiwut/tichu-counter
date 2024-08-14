<!--
  @component
  This component represents a reusable input field for the Tichu scoring application.
  It's designed to handle numeric input and provides a consistent styling across the app.

  Props:
  - value: The current value of the input field (two-way binding)
  - placeholder: The placeholder text for the input field
  - onInput: A function to be called when the input value changes

  Features:
  - Numeric input with pattern for mobile keyboards
  - Custom styling using Tailwind CSS classes
  - Two-way binding for the input value
  - Custom input handler
-->

<script>
	export let value;
	export let placeholder;
	export let onInput;

	/**
	 * Handles the input event and calls the provided onInput function
	 * @param {Event} event - The input event
	 */
	function handleInput(event) {
		onInput(event);
	}
</script>

<input
	type="number"
	pattern="[0-9]*"
	{placeholder}
	class="input input-bordered input-primary w-1/2 text-center"
	bind:value
	on:input={handleInput}
/>
