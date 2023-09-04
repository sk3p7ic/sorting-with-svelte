<script lang="ts">
	import MenuBar from '../components/MenuBar.svelte';
	import {
		bar_array,
		currently_evaluating,
		display_config,
		type BarColor,
		bar_colors
	} from '$lib/stores';

	let bars: number[] = [];
	bar_array.subscribe((v) => {
		bars = v;
	});
	let current_evals: number[] = [];
	currently_evaluating.subscribe((v) => {
		current_evals = v;
	});
	let bar_color: string;
	display_config.subscribe((v) => {
		bar_color = v.bar_color;
	});
	let color_list: BarColor[];
	bar_colors.subscribe((v) => {
		color_list = v;
	});
</script>

<main>
	<MenuBar />
	<div id="output">
		{#each bars as bar_height, idx}
			<div class="bar" style={`height: ${bar_height}px; background-color: ${color_list[idx]};`} />
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
