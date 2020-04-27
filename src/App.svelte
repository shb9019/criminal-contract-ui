<script>
	import Login from './components/Login.svelte';
	import {isLoggedIn} from './stores.js';
	import Dashboard from "./components/Dashboard.svelte";
</script>

<main>
	{#if !$isLoggedIn}
		<Login/>
	{/if}
	<Dashboard/>
</main>

<style>
</style>
