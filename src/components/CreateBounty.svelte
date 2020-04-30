<script>
    import { isCreateBountyOpen } from '../stores';
    import { onMount } from 'svelte';

    const closeCreateBounty = () => {
        isCreateBountyOpen.set(false);
    };

    let fileMessage = "No file uploaded";
    let realFileBtn;

    onMount(() => {
        realFileBtn = document.getElementById("real-file");

        realFileBtn.addEventListener("change", function() {
            if (realFileBtn.value) {
                fileMessage = realFileBtn.value.match(
                        /[\/\\]([\w\d\s\.\-\(\)]+)$/
                )[1];
            } else {
                fileMessage = "No file chosen, yet.";
            }
        });
    });


    const handleFileUpload = () => {
        console.log(realFileBtn);
        realFileBtn.click();
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
                        <input type="file" id="real-file" hidden="hidden" />
                        <button type="button" class="file-upload" on:click={handleFileUpload}>Upload File</button>
                        <span class="file-name-text">{fileMessage}</span>
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
</style>
