import {
	display_config,
	type DisplayConfig,
	current_algorithm,
	incr_num_swaps,
	AvailableAlgorithm
} from '$lib/stores';

let conf: DisplayConfig;
display_config.subscribe((value) => (conf = value));

let curr_algo: AvailableAlgorithm;
current_algorithm.subscribe((value) => (curr_algo = value));

export async function swap(arr: number[], a: number, b: number, sleep_duration = 100) {
	incr_num_swaps(curr_algo);
	const temp = arr[a];
	arr[a] = arr[b];
	arr[b] = temp;
	await sleep(sleep_duration);
}

export function sleep(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms * conf.time_scale));
}
