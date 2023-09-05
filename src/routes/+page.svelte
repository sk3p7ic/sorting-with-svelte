<script lang="ts">
	import MenuBar from '../components/MenuBar.svelte';
	import {
		bar_array,
		type BarColor,
		bar_colors,
		algorithm_stats,
		current_algorithm,
		type AlgorithmStats
	} from '$lib/stores';

	let bars: number[] = [];
	bar_array.subscribe((v) => {
		bars = v;
	});
	let color_list: BarColor[];
	bar_colors.subscribe((v) => {
		color_list = v;
	});
	let stats: Map<string, AlgorithmStats>;
	algorithm_stats.subscribe((v) => {
		stats = v;
	});
	let current_algo: string;
	current_algorithm.subscribe((v) => {
		current_algo = v;
	});
</script>

<main>
	<MenuBar />
	<div id="output">
		{#if stats.get(current_algo)}
			<div id="stat-display">
				<strong>Current Algorithm:</strong><span>{stats.get(current_algo)?.algorithm_name}</span>
				<strong>Algorithm Time Complexity:</strong><span
					>{stats.get(current_algo)?.algorithm_time_complexity}</span
				>
				<strong>Algorithm Space Complexity:</strong><span
					>{stats.get(current_algo)?.algorithm_space_complexity}</span
				>
				{#if stats.get(current_algo)?.current_number_of_comparisons}
					<strong>Current Number of Comparisons:</strong><span
						>{stats.get(current_algo)?.current_number_of_comparisons}</span
					>
				{/if}
				{#if stats.get(current_algo)?.current_number_of_swaps}
					<strong>Current Number of Swaps:</strong><span
						>{stats.get(current_algo)?.current_number_of_swaps}</span
					>
				{/if}
				<strong>Number of Bars:</strong><span>{bars.length}</span>
			</div>
		{/if}
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

	#stat-display {
		position: absolute;
		top: 4.5rem;
		left: 1.5rem;
		padding: 1rem;
		background-color: var(--black);
		color: var(--white);
		display: grid;
		grid-template-columns: 1fr auto;
		gap: 0.25rem 1rem;
		border: 1px solid var(--white);
	}
</style>
