import { get } from 'svelte/store';
import { bar_array, display_config } from './stores';

export function init_bar_array(window: Window, n_bars: number) {
	const arr: number[] = [];
	const min_height = get(display_config).min_height;
	for (let i = 0; i < n_bars; i++) {
		arr.push(Math.random() * (window.innerHeight * 0.8 - min_height) + min_height);
	}
	bar_array.set(arr);
}
