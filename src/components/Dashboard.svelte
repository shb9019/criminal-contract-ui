<script>
    import Navbar from './Navbar.svelte';
    import { isLoggedIn } from '../stores';
</script>

<div class={$isLoggedIn ? "wrapper" : "wrapper blur-bg"}>
    <Navbar/>
</div>

<style>
    .wrapper {
        position: fixed;
        top: 0;
        left: 0;
        margin: 0;
    }

    .blur-bg {
        filter: blur(4px);
        -webkit-filter: blur(4px);
        transform: scale(1.5);
    }
</style>
