<script>
    import Navbar from './Navbar.svelte';
    import CreateBounty from "./CreateBounty.svelte";
    import BountyList from "./BountyList.svelte";
    import { isLoggedIn, isCreateBountyOpen } from '../stores';

</script>

<div class={$isLoggedIn ? "wrapper" : "wrapper blur-bg"}>
    <Navbar/>
    {#if $isCreateBountyOpen}
        <CreateBounty/>
    {/if}
    <div class="container bounties-container">
        <BountyList/>
    </div>
</div>

<style>
    .wrapper {
        position: absolute;
        top: 0;
        left: 0;
        margin: 0;
        background-color: #3c3f41;
    }

    .blur-bg {
        filter: blur(4px);
        -webkit-filter: blur(4px);
    }

    .bounties-container {
        display: block;
        top: 60px;
        z-index: 0;
        position: absolute;
        background-color: #3c3f41;
        width: 100vw;
        max-width: 100%;
        padding: 0 80px;
        min-height: calc(100vh - 60px);
    }
</style>
