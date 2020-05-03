<script>
    import {isCreateBountyOpen} from '../stores';
    import {onMount} from 'svelte';
    import RadioButton from "./RadioButton.svelte";

    const closeCreateBounty = () => {
        isCreateBountyOpen.set(false);
    };

    // TODO: Make file input a separate component
    let plainTextFileMessage = "No file uploaded";
    let plainTextFileBtn;
    let cipherTextFileMessage = "No file uploaded";
    let cipherTextFileBtn;

    onMount(() => {
        plainTextFileBtn = document.getElementById("plain-text-file");
        cipherTextFileBtn = document.getElementById("cipher-text-file");

        plainTextFileBtn.addEventListener("change", function () {
            if (plainTextFileBtn.value) {
                plainTextFileMessage = plainTextFileBtn.value.match(
                        /[\/\\]([\w\d\s\.\-\(\)]+)$/
                )[1];
            } else {
                plainTextFileMessage = "No file uploaded";
            }
        });

        cipherTextFileBtn.addEventListener("change", function () {
            if (cipherTextFileBtn.value) {
                cipherTextFileMessage = cipherTextFileBtn.value.match(
                        /[\/\\]([\w\d\s\.\-\(\)]+)$/
                )[1];
            } else {
                cipherTextFileMessage = "No file uploaded";
            }
        });
    });


    const handlePlainTextFileUpload = () => {
        plainTextFileBtn.click();
    };

    const handleCipherTextFileUpload = () => {
        cipherTextFileBtn.click();
    };

    const completeTransaction = () => {
        // TODO: Post transaction formalities
        closeCreateBounty();
    };

    const payBounty = () => {
        // TODO: Contact the Smart Contract to make the payment
        completeTransaction();
    };
</script>

<div class="wrapper">
    <div class="container-lg create-bounty-container">
        <div class="row create-bounty-row">
            <div class="col-4 create-bounty-description">
                <div class="container-fluid create-bounty-description-container">
                    <div class="row create-bounty-heading">
                        Submit a Bounty
                    </div>
                    <div class="row create-bounty-disclaimer">
                        Warning: You have to deposit your Eth when submitting the bounty. If you decide to revoke,
                        your bounty will be removed and the tokens will be transferred back.
                    </div>
                </div>
            </div>
            <div class="col-8 create-bounty-form">
                <div class="container-fluid create-bounty-form-container">
                    <div class="row create-bounty-close" >
                        <span class="close-icon" on:click={closeCreateBounty}>
                            <i class="fa fa-times"></i>
                        </span>
                    </div>
                    <div class="row input-label">
                        <p>Upload Plain Text</p>
                    </div>
                    <div class="row input-field">
                        <input type="file" id="plain-text-file" hidden="hidden" accept=".txt" />
                        <button type="button" class="file-upload" on:click={handlePlainTextFileUpload}><b>Upload File</b></button>
                        <span class="file-name-text">{plainTextFileMessage}</span>
                    </div>
                    <br/>
                    <div class="row input-label">
                        <p>Upload Cipher Text</p>
                    </div>
                    <div class="row input-field">
                        <input type="file" id="cipher-text-file" hidden="hidden" accept=".txt" />
                        <button type="button" class="file-upload" on:click={handleCipherTextFileUpload}><b>Upload File</b></button>
                        <span class="file-name-text">{cipherTextFileMessage}</span>
                    </div>
                    <br/>
                    <div class="row input-label">
                        <p>Select Encryption Type</p>
                    </div>
                    <div class="row input-field">
                        <RadioButton name="enc-type" options={["AES-128", "Caesar", "Triple-DES"]}/>
                    </div>
                    <div class="row pay-button">
                        <div class={"form-submit-button hvr-sweep-to-right"} on:click={payBounty}>
                            Proceed to Pay
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    .create-bounty-container {
        max-width: 800px;
        min-width: 800px;
        box-shadow: 0 0 20px 3px rgba(0, 0, 0, 0.9);
    }

    .wrapper {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 50;
    }

    .create-bounty-description {
        min-height: 600px;
        background-color: #2b2b2b;
    }

    .create-bounty-close {
        min-width: 100%;
        padding: 15px;
        color: white;
        display: flex;
        justify-content: flex-end;
    }

    .create-bounty-form {
        min-height: 600px;
        background-color: #3c3f41;
        padding: 0;
    }

    .close-icon {
        float: right;
        cursor: pointer;
        padding: 0 6px;
    }

    .create-bounty-heading {
        font-family: 'Roboto Mono', monospace;
        color: #7caaaf;
        font-size: 30px;
        padding-left: 20px;
        padding-top: 35px;
        padding-bottom: 10px;
    }

    .create-bounty-disclaimer {
        font-family: 'Roboto Mono', monospace;
        color: #88ba55;
        font-size: 15px;
        padding-top: 20px;
        padding-left: 20px;
        padding-right: 20px;
    }

    .create-bounty-form-container {
        height: 100%;
    }

    .input-field, .input-label {
        padding: 0 30px;
    }

    .file-upload, .file-upload:active {
        background-color: transparent;
        color: #98aea7;
        border-radius: 3px;
        min-width: 150px;
    }

    .file-name-text {
        padding: 10px 10px 10px 20px;
        color: #98aea7;
    }

    .input-label {
        color: #a9b260;
        font-family: 'Roboto Mono', monospace;
        font-size: 18px;
    }

    .form-submit-button {
        min-width: 300px;
        min-height: 60px;
        max-height: 60px;
        background-color: #087F8C;
        color: white;
        font-weight: 500;
        font-size: 20px;
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
        position: absolute;
        bottom: 50px;
        left: 50%;
        transform: translateX(-50%);
    }
</style>
