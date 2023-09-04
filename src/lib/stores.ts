import { writable } from 'svelte/store';

export const bar_array = writable<number[]>([]);

/// Stores a list of indices that are currently being evaluated.
export const currently_evaluating = writable<number[]>([]);

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
