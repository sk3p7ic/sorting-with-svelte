import { BarColor, bar_array, bar_colors, display_config } from '../stores';
import { sleep, swap } from './utils';

let arr: number[];
bar_array.subscribe((value) => (arr = value));

let color: BarColor;
display_config.subscribe((value) => (color = value.bar_color));

export default async function insertionSort() {
	for (let i = 1; i < arr.length; i++) {
		let j = i - 1;
		const key = arr[i];
		bar_colors.update((value) => {
			value[i] = BarColor.WHITE;
			return value;
		});
		while (j >= 0 && arr[j] > key) {
			bar_colors.update((value) => {
				value[j] = BarColor.WHITE;
				return value;
			});
			await swap(arr, j, j + 1, 25);
			bar_array.set(arr);
			bar_colors.update((value) => {
				value[j] = value[j + 1] = color;
				return value;
			});
			j--;
		}
		arr[j + 1] = key;
	}
	for (let i = 0; i < arr.length; i++) {
		bar_colors.update((value) => {
			value[i] = BarColor.WHITE;
			return value;
		});
		await sleep(10);
	}
}
