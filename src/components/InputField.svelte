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

<script lang="ts">
	/**
	 * @prop {string} value - The current value of the input field.
	 */
	export let value: string = '';

	/**
	 * @prop {string} label - The label text for the input field.
	 */
	export let label: string = '';

	const id = `input-${Math.random().toString(36).substring(2, 9)}`;
</script>

<div class="form-control w-1/2">
	<label class="label" for={id}>
		<span class="label-text">{label}</span>
	</label>
	<input
		{id}
		type="number"
		pattern="[0-9]*"
		class="input input-bordered input-primary w-full text-center"
		bind:value
		on:input
	/>
</div>
