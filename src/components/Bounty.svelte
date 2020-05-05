<script>
    import { download } from '../utils';
    import {address0, publicAddress} from "../stores";

    export let contractor = "0xcafebabecafebabecafebabe";
    export let encType = "AES-128";
    export let cipherText = "";
    export let plainText = "";
    export let perpetrator = "";
    export let amount = 0;
    export let proof = {};
    export let index = 0;
    export let submit = (index) => {};
    export let accept = (index) => {};
    export let reject = (index) => {};

    let isSubmittedProof = false;
    let isSolved = false;
    let isInvalid = false;
    let keyUrl = "";
    let status = null;
    let publicAddressLocal;
    let canDispute = false;

    const unsubscribe = publicAddress.subscribe((value) => {
        publicAddressLocal = value;
    });

    const submitAccept = () => {
        if (!isSubmittedProof) {
            submit(index);
        } else {
            accept(index);
        }
    };

    const rejectKey = () => {
        reject(index);
    };

    $: for (let address in proof) {
        if (proof.hasOwnProperty(address)) {
            perpetrator = address;
            keyUrl = proof[address].encrypted_url;
            status = proof[address].status;
            console.log(proof[address]);
        }
    }

    $: if (status === "1") {
        isSolved = true;
    } else if (status === "0") {
        isInvalid = true;
    }

    $: isSubmittedProof = keyUrl !== "" && contractor === publicAddressLocal;

</script>

<div class="row bounty-row">
    <div class="col-md-9">
        <div class="row contractor-row">
            <div class="col-sm-10">
                {#if isSolved}
                    <p>Solved by {perpetrator}</p>
                {:else if isInvalid && perpetrator === publicAddressLocal}
                    <p>Your proof and key have been marked as invalid</p>
                {:else if !isSubmittedProof}
                    <p>Submitted by {contractor}</p>
                {:else if !isSolved}
                    <p>Proof submitted by {perpetrator}</p>
                {/if}
            </div>
            <div class="col-sm-2">
                <p>Amount: {amount} ETH</p>
            </div>
        </div>
        <div class="row download-row">
            <div class="col-lg-2"></div>
            <div class="col-lg-3 button-col">
                {#if !isSubmittedProof}
                    <a class="download-link" href={`https://transfer.sh/${cipherText}`} target="_blank">
                        <span>Download Inputs</span>
                        <i class="fa fa-download download-icon" aria-hidden="true"></i>
                    </a>
                {:else}
                    <a class="download-link" href={`https://transfer.sh/${keyUrl}`} target="_blank">
                        <span>Download Submitted Key</span>
                        <i class="fa fa-download download-icon" aria-hidden="true"></i>
                    </a>
                {/if}
            </div>
            <div class="col-lg-2"></div>
            {#if !isSolved && isSubmittedProof}
                <div class={`col-lg-3 button-col`} on:click={rejectKey}>
                    Reject Key
                </div>
            {/if}
            <div class="col-lg-2"></div>
        </div>
        {#if !isSolved}
            <div class="row submit-row">
                <div class="col-lg-4"></div>
                <div class="col-lg-4 submit-button" on:click={submitAccept}>
                    <span>{!isSubmittedProof ? 'SUBMIT KEY' : 'ACCEPT KEY'}</span>
                </div>
                <div class="col-lg-4"></div>
            </div>
        {/if}
        {#if isInvalid && perpetrator === publicAddressLocal}
            <div class="row submit-row dispute-row">
                <div class="col-lg-4"></div>
                <div class="col-lg-4 submit-button" on:click={submitAccept}>
                    <span>RAISE DISPUTE</span>
                </div>
                <div class="col-lg-4"></div>
            </div>
        {/if}
        </div>
    <div class={`col-md-3 enc-type-col`  + (isSubmittedProof ? ` proof-submitted` : ``) + (isSolved ? ` solved` : ``)}>
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
        box-shadow: 0 10px 16px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
    }

    .contractor-row {
        color: #98aea7;
        padding: 20px;
    }

    .button-col {
        min-height: 30px;
        background-color: white;
        color: black;
        padding: 10px 0;
    }

    .download-row {
        font-size: 13px;
    }

    .button-col {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #e8bf6a;
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

    .proof-submitted {
        background-color: #0f52ba;
    }

    .submit-row {
        padding-top: 50px;
        padding-bottom: 30px;
        min-height: 50px;
    }

    .submit-button {
        background-color: #EF6461;
        color: white;
        font-weight: 600;
        padding: 10px 0;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }

    .submit-button:hover {
        background-color: #ea332f;
    }

    .download-link {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .solved {
        background-color: red;
    }

    .dispute-row {
        padding-top: 0;
    }
</style>
