import {
	AvailableAlgorithm,
	BarColor,
	bar_array,
	bar_colors,
	display_config,
	incr_num_comparisons
} from '$lib/stores';
import { sleep, swap } from './utils';

let arr: number[];
bar_array.subscribe((value) => (arr = value));

let color: BarColor;
display_config.subscribe((value) => (color = value.bar_color));

export default async function heapSort() {
	for (let i = Math.floor(arr.length / 2 - 1); i >= 0; i--) {
		await heapify(arr, arr.length, i);
	}
	for (let i = arr.length - 1; i > 0; i--) {
		await swap(arr, 0, i, 25);
		await heapify(arr, i, 0);
	}
	for (let i = 0; i < arr.length; i++) {
		bar_colors.update((value) => {
			value[i] = BarColor.WHITE;
			return value;
		});
		await sleep(10);
	}
}

async function heapify(arr: number[], n: number, i: number) {
	let largest = i;
	const l = 2 * i + 1;
	const r = 2 * i + 2;
	bar_colors.update((value) => {
		value[largest] = BarColor.WHITE;
		return value;
	});
	if (l < n && arr[l] > arr[largest]) {
		incr_num_comparisons(AvailableAlgorithm.HEAP_SORT);
		largest = l;
	}
	if (r < n && arr[r] > arr[largest]) {
		incr_num_comparisons(AvailableAlgorithm.HEAP_SORT);
		largest = r;
	}
	if (largest != i) {
		incr_num_comparisons(AvailableAlgorithm.HEAP_SORT);
		await swap(arr, i, largest, 25);
		await heapify(arr, n, largest);
	}
	bar_colors.update((value) => {
		value[largest] = color;
		return value;
	});
}
