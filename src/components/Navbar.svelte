<script>
    import { publicAddress } from '../stores';
</script>

<div class="navbar-wrapper">
    <div class="row">
        <div class="col-sm-2 app-name">
            <b>CRIMINAL CONTRACT</b>
        </div>
        <div class="col-sm-3"></div>
        <div class="col-sm-2 menu-field">
            Submit Bounty
        </div>
        <div class="col-sm-2 menu-field">
            Bounties
        </div>
        <div class="col-sm-3 address">{$publicAddress.slice(0,20) + "..."}</div>
    </div>
</div>

<style>
    .navbar-wrapper {
        width: 100vw;
        height: 60px;
        margin: 0;
        background-color: #2f2f2f;
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
