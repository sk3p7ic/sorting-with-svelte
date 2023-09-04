import { display_config, type DisplayConfig } from '$lib/stores';

let conf: DisplayConfig;
display_config.subscribe((value) => (conf = value));

export async function swap(arr: number[], a: number, b: number, sleep_duration = 100) {
	const temp = arr[a];
	arr[a] = arr[b];
	arr[b] = temp;
	await sleep(sleep_duration);
}

export function sleep(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms * conf.time_scale));
}
