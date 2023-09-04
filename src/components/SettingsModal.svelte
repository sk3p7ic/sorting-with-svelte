<script lang="ts">
	import { updateAllColors } from '$lib/array';

	export let showSettingsDialog = false;
	export let callback: () => void;

	import { BarColor, bar_colors, type DisplayConfig, display_config } from '$lib/stores';
	let conf: DisplayConfig;
	let time_scale: number;
	display_config.subscribe((v) => {
		conf = v;
		time_scale = v.time_scale * 100;
	});
	let colors: BarColor[];
	bar_colors.subscribe((v) => {
		colors = v;
	});

	const available_colors = [
		{ name: 'Green', value: BarColor.GREEN },
		{ name: 'Yellow', value: BarColor.YELLOW },
		{ name: 'Blue', value: BarColor.BLUE },
		{ name: 'Magenta', value: BarColor.MAGENTA },
		{ name: 'Cyan', value: BarColor.CYAN }
	];

	const handleSubmit = (e: Event) => {
		e.preventDefault();
		display_config.set({ ...conf, time_scale: time_scale / 100 });
		updateAllColors(conf.bar_color);
		callback();
	};
</script>

{#if showSettingsDialog}
	<dialog>
		<h3>Settings</h3>
		<form on:submit|preventDefault={handleSubmit}>
			<div>
				<label for="bar-color">Bar Color</label>
				<select name="bar-color" id="bar-color" bind:value={conf.bar_color}>
					{#each available_colors as color}
						<option value={color.value}>{color.name}</option>
					{/each}
				</select>
			</div>
			<div>
				<label for="minimum-bar-height">Minimum Bar Height</label>
				<input
					type="number"
					name="minimum-bar-height"
					id="minimum-bar-height"
					bind:value={conf.min_height}
				/>
			</div>
			<div>
				<label for="time-scale">Animation Speed Multiplier</label>
				<input
					type="range"
					name="time-scale"
					id="time-scale"
					min="50"
					max="100"
					bind:value={time_scale}
					class="form-slider"
				/>
				<span class="tiny">Value: {(time_scale / 100).toPrecision(2)}</span>
			</div>
			<button type="submit">Save</button>
		</form>
	</dialog>
{/if}

<style>
	dialog {
		background-color: var(--black);
		color: var(--foreground);
		padding: 1rem;
		position: absolute;
		top: 50%;
		left: 50%;
		z-index: 100;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 1.5rem;
		transform: translate(-50%, -50%);
	}

	form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	form > div {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.form-slider {
		-webkit-appearance: none;
		appearance: none;
		width: 100%;
		height: 0.5rem;
		border-radius: 5px;
		background: var(--background);
		outline: none;
		opacity: 0.7;
		-webkit-transition: 0.2s;
		transition: opacity 0.2s;
	}

	.form-slider:hover {
		opacity: 1;
	}

	.form-slider::-webkit-slider-thumb {
		-webkit-appearance: none;
		appearance: none;
		width: 1.25rem;
		height: 1.25rem;
		border-radius: 50%;
		background: var(--white);
		cursor: pointer;
	}

	.form-slider::-moz-range-thumb {
		width: 1.25rem;
		height: 1.25rem;
		border-radius: 50%;
		background: var(--white);
		cursor: pointer;
	}

	.tiny {
		font-size: 0.75rem;
		text-align: end;
	}
</style>
