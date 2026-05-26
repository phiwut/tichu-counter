<script lang="ts">
	export let value: string | number = '';
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
