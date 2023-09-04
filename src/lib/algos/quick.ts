import { BarColor, bar_array, bar_colors, display_config } from '../stores';
import { sleep, swap } from './utils';

let arr: number[];
bar_array.subscribe((value) => (arr = value));

let color: BarColor;
display_config.subscribe((value) => (color = value.bar_color));

export default async function quickSort() {
	await quickSortHelper(0, arr.length - 1);
	for (let i = 0; i < arr.length; i++) {
		bar_colors.update((value) => {
			value[i] = BarColor.WHITE;
			return value;
		});
		await sleep(10);
	}
}

async function quickSortHelper(l: number, r: number) {
	if (l < r) {
		const pivot = await partition(l, r);
		await Promise.all([quickSortHelper(l, pivot - 1), quickSortHelper(pivot + 1, r)]);
	}
}

async function partition(l: number, r: number) {
	const pivot = arr[r];
	let i = l - 1;
	for (let j = l; j < r; j++) {
		bar_colors.update((value) => {
			value[j] = BarColor.WHITE;
			value[r] = BarColor.RED;
			return value;
		});
		if (arr[j] < pivot) {
			i++;
			await swap(arr, i, j, 50);
		}
		bar_array.set(arr);
		bar_colors.update((value) => {
			value[j] = value[r] = color;
			return value;
		});
	}
	await swap(arr, i + 1, r, 50);
	bar_array.set(arr);
	return i + 1;
}
