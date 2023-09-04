<script lang="ts">
	import { updateAllColors } from '$lib/array';

	export let showSettingsDialog = false;
	export let callback: () => void;

	import { BarColor, bar_colors, type DisplayConfig, display_config } from '$lib/stores';
	let conf: DisplayConfig;
	display_config.subscribe((v) => {
		conf = v;
	});
	let colors: BarColor[];
	bar_colors.subscribe((v) => {
		colors = v;
	});
	const handleSubmit = (e: Event) => {
		e.preventDefault();
		display_config.set(conf);
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
				<select name="bar-color" bind:value={conf.bar_color}>
					<option value={BarColor.RED}>Red</option>
					<option value={BarColor.GREEN}>Green</option>
					<option value={BarColor.YELLOW}>Yellow</option>
					<option value={BarColor.BLUE}>Blue</option>
					<option value={BarColor.MAGENTA}>Magenta</option>
					<option value={BarColor.CYAN}>Cyan</option>
				</select>
			</div>
			<div>
				<label for="minimum-bar-height">Minimum Bar Height</label>
				<input type="number" name="minimum-bar-height" bind:value={conf.min_height} />
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
</style>
