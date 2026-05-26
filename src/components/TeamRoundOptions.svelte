<script lang="ts">
	import type { TeamFlags } from '../lib/round';
	import { t } from '../lib/translations';

	export let flags: TeamFlags;
</script>

<div class="form-control w-1/2">
	<label class="label cursor-pointer">
		<span class="label-text">{$t.gameControls.tichuLabel}</span>
		<input type="checkbox" class="checkbox" bind:checked={flags.tichu} />
	</label>
	<label class="label cursor-pointer">
		<span class="label-text">{$t.gameControls.grandTichuLabel}</span>
		<input type="checkbox" class="checkbox" bind:checked={flags.grand} />
	</label>
	<label class="label cursor-pointer">
		<span class="label-text">{$t.gameControls.lostTichuLabel}</span>
		<input type="checkbox" class="checkbox checkbox-error" bind:checked={flags.lostTichu} />
	</label>
	<label class="label cursor-pointer">
		<span class="label-text">{$t.gameControls.lostGrandTichuLabel}</span>
		<input type="checkbox" class="checkbox checkbox-error" bind:checked={flags.lostGrand} />
	</label>
	<label class="label cursor-pointer">
		<span class="label-text">{$t.gameControls.doubleWinLabel}</span>
		<input type="checkbox" class="checkbox checkbox-warning" bind:checked={flags.doubleWin} />
	</label>
</div>
