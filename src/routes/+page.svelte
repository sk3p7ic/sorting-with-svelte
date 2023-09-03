<script lang="ts">
	import MenuBar from '../components/MenuBar.svelte';
</script>

<main>
	<MenuBar />
	<div id="output" />
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		height: 100vh;
	}

	div#output {
		width: 100%;
		height: 100%;
	}
</style>
