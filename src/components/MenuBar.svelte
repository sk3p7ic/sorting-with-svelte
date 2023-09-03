<script lang="ts">
	import { init_bar_array } from '$lib/array.ts';
	const generateNewArray = (e: Event) => {
		e.preventDefault();
		console.log('Generating new array');
		const n_bars = Math.floor(window.innerWidth / 15);
		init_bar_array(window, n_bars);
	};
</script>

<div id="menu-bar">
	<div id="title-and-buttons">
		<h2>Sorting Visualizer</h2>
		<form id="bar-form">
			<span class="divider" />
			<label for="sort-algo">Sorting Algorithm</label>
			<select name="sort-algo">
				<option value="bubble-sort">Bubble Sort</option>
				<option value="insertion-sort">Insertion Sort</option>
				<option value="selection-sort">Selection Sort</option>
				<option value="merge-sort">Merge Sort</option>
				<option value="quick-sort">Quick Sort</option>
				<option value="heap-sort">Heap Sort</option>
			</select>
			<span class="divider" />
			<button on:click={generateNewArray}>Generate New Array</button>
			<span class="divider" />
		</form>
	</div>
</div>

<style>
	div#menu-bar {
		padding: 0rem 1.5rem;
		background-color: var(--black);
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
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

	@media (max-width: 768px) {
		#menu-bar {
			flex-direction: column;
			justify-content: center;
		}

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
	}
</style>
