<script lang="ts">
	import MenuBar from '../components/MenuBar.svelte';
	import { bar_array, display_config } from '$lib/stores.ts';

	let bars: number[] = [];
	bar_array.subscribe((v) => {
		bars = v;
	});
	let bar_color: string;
	display_config.subscribe((v) => {
		bar_color = v.bar_color;
	});
</script>

<main>
	<MenuBar />
	<div id="output">
		{#each bars as bar_height}
			<div class="bar" style={`height: ${bar_height}px; background-color: ${bar_color};`} />
		{/each}
	</div>
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		height: 100vh;
	}

	div#output {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: row;
		align-items: end;
		justify-content: center;
		gap: 5px;
	}

	.bar {
		width: 10px;
	}
</style>
