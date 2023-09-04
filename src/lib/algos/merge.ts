import { BarColor, bar_array, bar_colors, display_config } from '../stores';
import { sleep } from './utils';

let arr: number[];
bar_array.subscribe((value) => (arr = value));

let color: BarColor;
display_config.subscribe((value) => (color = value.bar_color));

export default async function mergeSort() {
	await mergeSortHelper(0, arr.length - 1);
	for (let i = 0; i < arr.length; i++) {
		bar_colors.update((value) => {
			value[i] = BarColor.WHITE;
			return value;
		});
		await sleep(10);
	}
}

async function mergeSortHelper(l: number, r: number) {
	if (l < r) {
		const m = Math.floor((l + r) / 2);
		await Promise.all([mergeSortHelper(l, m), mergeSortHelper(m + 1, r)]);
		await merge(l, m, r);
		for (let i = 0; i < arr.length; i++) {
			bar_colors.update((value) => {
				value[i] = color;
				return value;
			});
		}
	}
}

async function merge(l: number, m: number, r: number) {
	const n1 = m - l + 1;
	const n2 = r - m;
	const L = new Array(n1);
	const R = new Array(n2);
	for (let i = 0; i < n1; i++) {
		L[i] = arr[l + i];
	}
	for (let i = 0; i < n2; i++) {
		R[i] = arr[m + 1 + i];
	}
	let i = 0;
	let j = 0;
	let k = l;
	while (i < n1 && j < n2) {
		bar_colors.update((value) => {
			value[l + i] = value[m + 1 + j] = BarColor.WHITE;
			return value;
		});
		await sleep(25);
		if (L[i] <= R[j]) {
			arr[k] = L[i];
			i++;
		} else {
			arr[k] = R[j];
			j++;
		}
		bar_array.set(arr);
		bar_colors.update((value) => {
			value[l + i] = value[m + 1 + j] = color;
			return value;
		});
		k++;
	}
	while (i < n1) {
		bar_colors.update((value) => {
			value[l + i] = BarColor.RED;
			return value;
		});
		await sleep(25);
		arr[k] = L[i];
		i++;
		bar_array.set(arr);
		bar_colors.update((value) => {
			value[l + i] = color;
			return value;
		});
		k++;
	}
	while (j < n2) {
		bar_colors.update((value) => {
			value[m + 1 + j] = BarColor.RED;
			return value;
		});
		await sleep(25);
		arr[k] = R[j];
		j++;
		bar_array.set(arr);
		bar_colors.update((value) => {
			value[m + 1 + j] = color;
			return value;
		});
		k++;
	}
}
