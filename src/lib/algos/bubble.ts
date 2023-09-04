import { BarColor, bar_array, bar_colors, display_config } from '../stores';
import { sleep, swap } from './utils';

let arr: number[];
bar_array.subscribe((value) => (arr = value));

let color: BarColor;
display_config.subscribe((value) => (color = value.bar_color));

export default async function bubbleSort() {
	for (let i = 0; i < arr.length; i++) {
		for (let j = 0; j < arr.length - i - 1; j++) {
			bar_colors.update((value) => {
				value[j] = value[j + 1] = BarColor.WHITE;
				return value;
			});
			if (arr[j] > arr[j + 1]) {
				await swap(arr, j, j + 1, 25);
			}
			bar_array.set(arr);
			bar_colors.update((value) => {
				value[j] = value[j + 1] = color;
				return value;
			});
		}
	}
	for (let i = 0; i < arr.length; i++) {
		bar_colors.update((value) => {
			value[i] = BarColor.WHITE;
			return value;
		});
		await sleep(10);
	}
}
