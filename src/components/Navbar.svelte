<script>
    import { publicAddress, isCreateBountyOpen } from '../stores';
    import {onMount} from "svelte";

    let publicAddressLocal;
    let balance = 0;

    const unsubscribe = publicAddress.subscribe((value) => {
        publicAddressLocal = value;
    });

    const toggleCreateBounty = () => {
        isCreateBountyOpen.update(val => !val);
    };

    const fetchUserDetails = () => {
        fetch('http://localhost:7777/read_self_data', {
            mode: 'cors'
        }).then((response) => {
            return response.json();
        }).then((data) => {
            console.log(data);
            publicAddress.set(data.public_key);
            balance = data.money;
        });
    };

    onMount(() => {
        fetchUserDetails();
        setInterval(() => {
            fetchUserDetails();
        }, 6000);
    });
</script>

<div class="navbar-wrapper">
    <div class="row">
        <div class="col-sm-2 app-name">
            <b>CRIMINAL CONTRACT</b>
        </div>
        <div class="col-sm-1 menu-field" on:click={toggleCreateBounty}>
            Submit
        </div>
        <div class="col-sm-4"></div>
        <div class="col-sm-3 address" title={publicAddressLocal}>Address: {$publicAddress.slice(0,25) + "..."}</div>
        <div class="col-sm-2 address">Balance: {balance}</div>
    </div>
</div>

<style>
    .navbar-wrapper {
        width: 100vw;
        height: 60px;
        margin: 0;
        background-color: #2f2f2f;
        z-index: 100;
    }

    .navbar-wrapper .row {
        margin: 0;
    }

    .app-name {
        height: 60px;
        font-size: 16px;
        font-family: 'Roboto Mono', monospace;
        padding-right: 25px;
        display: flex;
        justify-content: center;
        flex-direction: column;
        color: #a9b260;
        padding-left: 30px;
        cursor: pointer;
    }

    .menu-field {
        height: 60px;
        font-size: 15px;
        font-family: 'Roboto Mono', monospace;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        color: #609398;
        padding-left: 30px;
        cursor: pointer;
        transition: 0.1s font-size;
    }

    .menu-field:hover {
        font-size: 18px;
    }

    .address {
        height: 60px;
        color: white;
        font-size: 15px;
        font-family: 'Roboto Mono', monospace;
        padding-right: 25px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
</style>
