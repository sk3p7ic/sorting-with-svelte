import { get } from 'svelte/store';
import { BarColor, bar_array, bar_colors, display_config } from './stores';

export function init_bar_array(window: Window, n_bars: number, color: BarColor) {
	const arr: number[] = [];
	const colors: BarColor[] = [];
	const min_height = get(display_config).min_height;
	const max_height_modifier = window.innerWidth >= 768 ? 0.8 : 0.6;
	for (let i = 0; i < n_bars; i++) {
		arr.push(Math.random() * (window.innerHeight * max_height_modifier - min_height) + min_height);
		colors.push(color);
	}
	bar_array.set(arr);
	bar_colors.set(colors);
}

export function updateAllColors(color: BarColor) {
	const colors = get(bar_colors);
	for (let i = 0; i < colors.length; i++) {
		colors[i] = color;
	}
	bar_colors.set(colors);
}
