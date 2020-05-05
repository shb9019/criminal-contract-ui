<script>
    import { download } from '../utils';
    import {address0} from "../stores";
    export let contractor = "0xcafebabecafebabecafebabe";
    export let encType = "AES-128";
    export let cipherText = "";
    export let plainText = "";
    export let perpetrator = "";
    export let amount = 0;

    $: console.log(perpetrator);
</script>

<div class="row bounty-row">
    <div class="col-md-9">
        <div class="row contractor-row">
            <div class="col-sm-9">
                <p>Submitted by {contractor}</p>
            </div>
            <div class="col-sm-3">
                <p>Amount: {amount} ETH</p>
            </div>
        </div>
        <div class="row download-row">
            <div class="col-lg-2"></div>
            <div class="col-lg-3 button-col" on:click={download('plain_text.txt', plainText)}>
                <span>Plain Text</span>
                <i class="fa fa-download download-icon" aria-hidden="true"></i>
            </div>
            <div class="col-lg-2"></div>
            <div class="col-lg-3 button-col" on:click={download('cipher_text.txt', cipherText)}>
                <span>Cipher Text</span>
                <i class="fa fa-download download-icon" aria-hidden="true"></i>
            </div>
            <div class="col-lg-2"></div>
        </div>
        <div class="row submit-row">
            <div class="col-lg-4"></div>
            <div class="col-lg-4 button-col submit-button">
                <span>{perpetrator === address0 ? 'SUBMIT KEY' : 'BROKEN!'}</span>
            </div>
            <div class="col-lg-4"></div>
        </div>
    </div>
    <div class="col-md-3 enc-type-col">
        <p>{encType}</p>
    </div>
</div>

<style>
    .bounty-row {
        position: relative;
        width: 100%;
        min-height: 200px;
        margin: 30px 0;
        background-color: #2b2b2b;
        font-family: 'Roboto Mono', monospace;
    }

    .contractor-row {
        color: #98aea7;
        padding: 20px;
    }

    .button-col {
        min-height: 30px;
        background-color: white;
    }

    .download-row {
        font-size: 13px;
    }

    .button-col {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #e8bf6a;
        padding: 10px 0;
    }

    .button-col:hover {
        cursor: pointer;
        background-color: #e0aa38;
    }

    .download-icon {
        margin: 0 0 0 15px;
    }

    .enc-type-col {
        background-color: #21c56f;
        color: white;
        font-size: 25px;
        font-weight: 800;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .submit-row {
        padding-top: 50px;
        padding-bottom: 30px;
    }

    .submit-button {
        background-color: #EF6461;
        color: white;
        font-weight: 600;
    }

    .submit-button:hover {
        background-color: #ea332f;
    }
</style>
