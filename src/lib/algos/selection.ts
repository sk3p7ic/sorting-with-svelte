import { BarColor, bar_array, bar_colors, display_config } from '../stores';
import { sleep, swap } from './utils';

let arr: number[];
bar_array.subscribe((value) => (arr = value));

let color: BarColor;
display_config.subscribe((value) => (color = value.bar_color));

export default async function selectionSort() {
	for (let i = 0; i < arr.length; i++) {
		let min_idx = i;
		for (let j = i + 1; j < arr.length; j++) {
			bar_colors.update((value) => {
				value[j] = BarColor.WHITE;
				return value;
			});
			await sleep(5);
			if (arr[j] < arr[min_idx]) {
				min_idx = j;
			}
			bar_array.set(arr);
			bar_colors.update((value) => {
				value[j] = color;
				return value;
			});
		}
		await swap(arr, i, min_idx, 50);
		bar_array.set(arr);
		bar_colors.update((value) => {
			value[i] = value[min_idx] = color;
			return value;
		});
	}
	for (let i = 0; i < arr.length; i++) {
		bar_colors.update((value) => {
			value[i] = BarColor.WHITE;
			return value;
		});
		await sleep(10);
	}
}
