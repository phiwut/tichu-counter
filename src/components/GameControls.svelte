<script>
	import { scoreStore } from "../stores/scoreStore";
	import { settingsStore } from "../stores/settingsStore";

	let showResetModal = false;

	function handleReset() {
		showResetModal = true;
	}

	function confirmReset() {
		scoreStore.update(() => ({
			totalA: 0,
			totalB: 0,
			scores: [],
		}));
		showResetModal = false;
	}

	function closeResetModal() {
		showResetModal = false;
	}

	function openSettingsModal() {
		document.getElementById("settings-modal").showModal();
	}
</script>

<div class="w-full px-10 mb-8 flex justify-between">
	<button
		class="btn btn-outline btn-natural w-1/2 mr-2"
		on:click={openSettingsModal}>Settings</button
	>
	<button class="btn btn-outline btn-error w-1/2 ml-2" on:click={handleReset}
		>Reset Scores</button
	>
</div>

{#if showResetModal}
	<dialog class="modal" open>
		<div class="modal-box">
			<h2 class="font-bold text-xl">Confirm Reset</h2>
			<p>Are you sure you want to reset the scores?</p>
			<div class="modal-action">
				<button class="btn" on:click={closeResetModal}>No</button>
				<button class="btn btn-error" on:click={confirmReset}
					>Yes</button
				>
			</div>
		</div>
	</dialog>
{/if}
