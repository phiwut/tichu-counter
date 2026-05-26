<script lang="ts">
	import { settingsStore } from '../stores/settings-store';
	import { totals } from '../stores/score-store';
	import { t } from '../lib/translations';
</script>

<div class="sticky top-0 bg-primary-content z-10 p-5">
	<div class="stats shadow w-full">
		<div class="stat place-items-center">
			<div class="stat-title">{$settingsStore.teamA}</div>
			<div class="stat-value text-primary">{$totals.totalA}</div>
			<div class="stat-desc">{$t.header.points}</div>
		</div>
		<div class="stat place-items-center">
			<div class="stat-title">{$settingsStore.teamB}</div>
			<div class="stat-value text-primary">{$totals.totalB}</div>
			<div class="stat-desc">{$t.header.points}</div>
		</div>
	</div>
</div>
