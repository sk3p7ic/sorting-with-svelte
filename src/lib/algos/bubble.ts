import { bar_array } from '../stores';
import { swap } from './utils';

let arr: number[];
bar_array.subscribe((value) => (arr = value));

export default async function bubble_sort() {
	for (let i = 0; i < arr.length; i++) {
		for (let j = 0; j < arr.length - i - 1; j++) {
			if (arr[j] > arr[j + 1]) {
				await swap(arr, j, j + 1, 25);
			}
			bar_array.set(arr);
		}
	}
}
