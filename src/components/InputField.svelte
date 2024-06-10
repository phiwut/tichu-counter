<script>
	export let value;
	export let placeholder;
	export let onInput;

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
