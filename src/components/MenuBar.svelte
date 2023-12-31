<script lang="ts">
	import SettingsModal from './SettingsModal.svelte';
	import { get } from 'svelte/store';
	import {
		BarColor,
		bar_array,
		current_algorithm,
		display_config,
		is_sorting,
		reset_algorithm_stats,
		string_to_available_algorithm
	} from '$lib/stores';
	import { init_bar_array } from '$lib/array';
	import bubbleSort from '$lib/algos/bubble';
	import insertionSort from '$lib/algos/insertion';
	import selectionSort from '$lib/algos/selection';
	import mergeSort from '$lib/algos/merge';
	import quickSort from '$lib/algos/quick';
	import heapSort from '$lib/algos/heap';

	let bar_color: BarColor;
	display_config.subscribe((v) => {
		bar_color = v.bar_color;
	});

	const generateNewArray = () => {
		const n_bars = Math.floor(window.innerWidth / 15);
		init_bar_array(window, n_bars, bar_color);
	};

	let selectedAlgorithm: string;
	current_algorithm.subscribe((v) => {
		selectedAlgorithm = v;
	});
	const runAlgorithm = async (e: Event) => {
		e.preventDefault();
		is_sorting.set(true);
		reset_algorithm_stats();
		if (get(bar_array).length === 0) {
			generateNewArray();
		}
		switch (selectedAlgorithm) {
			case 'bubble-sort':
				await bubbleSort();
				is_sorting.set(false);
				break;
			case 'insertion-sort':
				await insertionSort();
				is_sorting.set(false);
				break;
			case 'selection-sort':
				await selectionSort();
				is_sorting.set(false);
				break;
			case 'merge-sort':
				await mergeSort();
				is_sorting.set(false);
				break;
			case 'quick-sort':
				await quickSort();
				is_sorting.set(false);
				break;
			case 'heap-sort':
				await heapSort();
				is_sorting.set(false);
				break;
		}
	};

	let isSorting = false;
	is_sorting.subscribe((v) => {
		isSorting = v;
	});

	let showSettings = false;
	const toggleSettingsModal = () => {
		showSettings = !showSettings;
	};
</script>

<div id="menu-bar">
	<div id="title-and-buttons">
		<h2>Sorting Visualizer</h2>
		<form id="bar-form" on:submit|preventDefault={generateNewArray}>
			<span class="divider" />
			<label for="sort-algo">Sorting Algorithm</label>
			<select
				name="sort-algo"
				id="sort-algo"
				bind:value={selectedAlgorithm}
				on:change={() => current_algorithm.set(string_to_available_algorithm(selectedAlgorithm))}
			>
				<option value="bubble-sort">Bubble Sort</option>
				<option value="insertion-sort">Insertion Sort</option>
				<option value="selection-sort">Selection Sort</option>
				<option value="merge-sort">Merge Sort</option>
				<option value="quick-sort">Quick Sort</option>
				<option value="heap-sort">Heap Sort</option>
			</select>
			<button on:click={runAlgorithm} disabled={isSorting}>Run</button>
			<span class="divider" />
			<button type="submit" disabled={isSorting}>New Array</button>
			<span class="divider" />
		</form>
	</div>
	<button class="btn" on:click={toggleSettingsModal}>Settings</button>
	<SettingsModal showSettingsDialog={showSettings} callback={toggleSettingsModal} />
</div>

<style>
	div#menu-bar {
		padding: 0rem 1.5rem;
		background-color: var(--black);
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-between;
	}

	#title-and-buttons {
		height: 100%;
		display: flex;
		flex-direction: row;
		gap: 2rem;
		justify-content: space-between;
		align-items: center;
	}

	#title-and-buttons h2 {
		padding: 0.5rem 0rem;
		color: var(--foreground);
	}

	#bar-form {
		display: flex;
		flex-direction: row;
		gap: 1rem;
		align-items: center;
	}

	#bar-form > span.divider {
		height: 1.5rem;
		width: 2px;
		background-color: var(--foreground);
	}

	#bar-form > button {
		padding: 0.35rem 1rem;
		border: none;
		border-radius: 0.5rem;
		background-color: var(--foreground);
		color: var(--black);
		font-weight: 600;
		cursor: pointer;
		transition: background-color 0.2s ease-in-out;
	}

	#bar-form > button:hover {
		background-color: var(--red);
	}

	#bar-form > button:active {
		background-color: var(--magenta);
	}

	#bar-form > button:disabled {
		background-color: var(--black);
		color: var(--white);
		cursor: not-allowed;
		border: 1px solid var(--foreground);
	}

	#bar-form > select {
		padding: 0.25rem 1rem;
		border: none;
		border-radius: 0.5rem;
		background-color: var(--foreground);
		color: var(--black);
		font-weight: 600;
		cursor: pointer;
		transition: background-color 0.2s ease-in-out;
	}

	#bar-form > select:hover {
		background-color: var(--green);
	}

	#bar-form > select:active > * {
		background-color: var(--black);
		color: var(--foreground);
	}

	.btn {
		padding: 0.25rem 1rem;
		border: none;
		border-radius: 0.5rem;
		background-color: var(--black);
		color: var(--white);
		font-weight: 600;
		cursor: pointer;
		transition-property: color, background-color;
		transition-timing-function: ease-in-out;
		transition-duration: 0.2s;
	}

	.btn:hover,
	.btn:active {
		background-color: var(--white);
		color: var(--black);
	}

	@media (max-width: 960px) {
		#title-and-buttons {
			width: 100%;
			padding-bottom: 0.5rem;
			flex-direction: column;
			gap: 1rem;
		}

		#bar-form {
			padding: 0.5rem;
			width: 100%;
			flex-direction: column;
			gap: 1rem;
			border: 1px solid var(--white);
			border-radius: 0.5rem;
		}

		#bar-form > span.divider {
			display: none;
		}

		.btn {
			display: none;
		}
	}
</style>
