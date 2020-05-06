<script>
    export let close = () => {};
    export let dispute = (decryptedKeyLink) => {};

    let decryptedKeyLink = "";

</script>

<div class="wrapper">
    <div class="container-lg submit-key-container">
        <div class="row create-bounty-close" >
            <span class="close-icon" on:click={close}>
                <i class="fa fa-times"></i>
            </span>
        </div>
        <div class="row input-label submit-key-row">
            <p>Link to Decrypted Key</p>
        </div>
        <div class="row input-field submit-key-row">
            <input type="text" class="form-control" id="input-text-link" bind:value={decryptedKeyLink}/>
        </div>
        <br/>
        <div class="row pay-button">
            <div class={`form-submit-button hvr-sweep-to-right'`} on:click={() => dispute(decryptedKeyLink)}>
                Dispute
            </div>
        </div>
    </div>
</div>

<style>
    .create-bounty-close {
        min-width: 100%;
        color: white;
        display: flex;
        justify-content: flex-end;
    }

    .close-icon {
        float: right;
        cursor: pointer;
        padding: 0 6px;
    }

    .submit-key-container {
        max-width: 500px;
        min-width: 500px;
        box-shadow: 0 0 20px 3px rgba(0, 0, 0, 0.9);
        padding: 12px 30px 30px;
        background-color: #2b2b2b;
        font-family: 'Roboto Mono', monospace;
    }

    .wrapper {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 50;
    }

    .submit-key-row {
        min-height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .file-upload, .file-upload:active {
        background-color: transparent;
        color: #98aea7;
        border-radius: 3px;
        min-width: 150px;
        padding: 12px;
    }

    .file-name-text {
        padding: 10px 10px 10px 20px;
        color: #98aea7;
    }

    .form-submit-button {
        min-width: 250px;
        min-height: 50px;
        max-height: 50px;
        background-color: #087F8C;
        color: white;
        font-weight: 500;
        font-size: 18px;
        font-family: 'Source Code Pro', monospace;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        cursor: pointer;
    }

    .hvr-sweep-to-right:before {
        background-color: #FAA916;
    }

    .pay-button {
        display: flex;
        align-items: center;
        justify-content: center;
        padding-top: 40px;
    }

    .input-label {
        color: #98aea7;
    }

    .input-field {
        padding-left: 30px;
        padding-right: 30px;
    }
</style>
