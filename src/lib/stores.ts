import { writable } from 'svelte/store';

export const bar_array = writable<number[]>([]);

export enum BarColor {
	RED = 'var(--red)',
	GREEN = 'var(--green)',
	YELLOW = 'var(--yellow)',
	BLUE = 'var(--blue)',
	MAGENTA = 'var(--magenta)',
	CYAN = 'var(--cyan)',
	WHITE = 'var(--white)'
}

export type DisplayConfig = {
	min_height: number;
	bar_color: BarColor;
};

export const display_config = writable<DisplayConfig>({
	min_height: 10,
	bar_color: BarColor.CYAN
});
