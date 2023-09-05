/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { writable } from 'svelte/store';

export const bar_array = writable<number[]>([]);

/// Stores a list of indices that are currently being evaluated.
export const currently_evaluating = writable<number[]>([]);

export enum BarColor {
	RED = 'var(--red)',
	GREEN = 'var(--green)',
	YELLOW = 'var(--yellow)',
	BLUE = 'var(--blue)',
	MAGENTA = 'var(--magenta)',
	CYAN = 'var(--cyan)',
	WHITE = 'var(--white)'
}

export const bar_colors = writable<BarColor[]>([]);

export type DisplayConfig = {
	min_height: number;
	bar_color: BarColor;
	time_scale: number;
};

export const display_config = writable<DisplayConfig>({
	min_height: 10,
	bar_color: BarColor.CYAN,
	time_scale: 1
});

export const is_sorting = writable<boolean>(false);

export type AlgorithmStats = {
	algorithm_name: string;
	algorithm_time_complexity: string;
	algorithm_space_complexity: string;
	current_number_of_comparisons?: number;
	current_number_of_swaps?: number;
};

export enum AvailableAlgorithm {
	BUBBLE_SORT = 'bubble-sort',
	SELECTION_SORT = 'selection-sort',
	INSERTION_SORT = 'insertion-sort',
	QUICK_SORT = 'quick-sort',
	MERGE_SORT = 'merge-sort',
	HEAP_SORT = 'heap-sort'
}

export const default_algorithm_stats: Map<AvailableAlgorithm, AlgorithmStats> = new Map([
	[
		AvailableAlgorithm.BUBBLE_SORT,
		{
			algorithm_name: 'Bubble Sort',
			algorithm_time_complexity: 'O(n^2)',
			algorithm_space_complexity: 'O(1)'
		}
	],
	[
		AvailableAlgorithm.SELECTION_SORT,
		{
			algorithm_name: 'Selection Sort',
			algorithm_time_complexity: 'O(n^2)',
			algorithm_space_complexity: 'O(1)'
		}
	],
	[
		AvailableAlgorithm.INSERTION_SORT,
		{
			algorithm_name: 'Insertion Sort',
			algorithm_time_complexity: 'O(n^2)',
			algorithm_space_complexity: 'O(1)'
		}
	],
	[
		AvailableAlgorithm.QUICK_SORT,
		{
			algorithm_name: 'Quick Sort',
			algorithm_time_complexity: 'O(n log(n))',
			algorithm_space_complexity: 'O(nlog(n))'
		}
	],
	[
		AvailableAlgorithm.MERGE_SORT,
		{
			algorithm_name: 'Merge Sort',
			algorithm_time_complexity: 'O(n log(n))',
			algorithm_space_complexity: 'O(n)'
		}
	],
	[
		AvailableAlgorithm.HEAP_SORT,
		{
			algorithm_name: 'Heap Sort',
			algorithm_time_complexity: 'O(n log(n))',
			algorithm_space_complexity: 'O(1)'
		}
	]
]);

export const algorithm_stats =
	writable<Map<AvailableAlgorithm, AlgorithmStats>>(default_algorithm_stats);

export const current_algorithm = writable<AvailableAlgorithm>(AvailableAlgorithm.BUBBLE_SORT);

export function reset_algorithm_stats() {
	algorithm_stats.set(default_algorithm_stats);
}

export function string_to_available_algorithm(algorithm_name: string): AvailableAlgorithm {
	switch (algorithm_name) {
		case 'bubble-sort':
			return AvailableAlgorithm.BUBBLE_SORT;
		case 'selection-sort':
			return AvailableAlgorithm.SELECTION_SORT;
		case 'insertion-sort':
			return AvailableAlgorithm.INSERTION_SORT;
		case 'quick-sort':
			return AvailableAlgorithm.QUICK_SORT;
		case 'merge-sort':
			return AvailableAlgorithm.MERGE_SORT;
		case 'heap-sort':
			return AvailableAlgorithm.HEAP_SORT;
		default:
			return AvailableAlgorithm.BUBBLE_SORT;
	}
}

export function incr_num_comparisons(algorithm: AvailableAlgorithm) {
	algorithm_stats.update((value) => {
		if (value.has(algorithm)) {
			value.get(algorithm)!.current_number_of_comparisons =
				(value.get(algorithm)!.current_number_of_comparisons || 0) + 1;
		}
		return value;
	});
}

export function incr_num_swaps(algorithm: AvailableAlgorithm) {
	algorithm_stats.update((value) => {
		if (value.has(algorithm)) {
			value.get(algorithm)!.current_number_of_swaps =
				(value.get(algorithm)!.current_number_of_swaps || 0) + 1;
		}
		return value;
	});
}
