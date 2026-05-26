<script lang="ts">
	import type { TeamFlags } from '../lib/round';
	import { t } from '../lib/translations';

	export let flags: TeamFlags;
</script>

{#if flags.tichu}<span class="badge badge-success">{$t.gameControls.tichuLabel}</span>{/if}
{#if flags.grand}<span class="badge badge-success">{$t.gameControls.grandTichuLabel}</span>{/if}
{#if flags.lostTichu}<span class="badge badge-error">{$t.gameControls.lostTichuLabel}</span>{/if}
{#if flags.lostGrand}<span class="badge badge-error">{$t.gameControls.lostGrandTichuLabel}</span>{/if}
{#if flags.doubleWin}<span class="badge badge-warning">{$t.gameControls.doubleWinLabel}</span>{/if}
