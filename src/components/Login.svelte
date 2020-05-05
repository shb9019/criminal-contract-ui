<script>
    import {isLoggedIn, publicAddress, nodePort} from '../stores.js';

    let web3 = undefined;
    let isLoading = false;
    let publicAddressLocal = undefined;
    let nodePortLocal;

    const unsubscribe = nodePort.subscribe((value) => {
        nodePortLocal = value;
    });

    const handleLogin = async () => {
        try {
            isLoading = true;
            fetch(`http://localhost:${nodePortLocal}/read_self_data`, {
                mode: 'cors'
            }).then((response) => {
                return response.json();
            }).then((data) => {
                console.log(data);
                publicAddress.set(data.public_key);
                isLoading = false;
                isLoggedIn.set(true);
            });
        } catch (error) {
            isLoading = false;
            alert("Connection Failed!");
        }
    };

    $: nodePort.set(nodePortLocal);
</script>

<div class="wrapper">
    <div class="container-lg login-container">
        <div class="row login-row">
            <div class="col login-description">
                <div class="container-fluid login-description-container">
                    <div class="row login-heading">
                        Connect
                    </div>
                    <div class="row login-disclaimer">
                        Please run your corresponding local python node before using the site. {nodePortLocal}
                    </div>
                    <div class="row login-disclaimer">
                        <input type="text" class="form-control" bind:value={nodePortLocal}/>
                    </div>
                    <div class="row login-disclaimer">
                        Download from&nbsp;<a href="https://metamask.io/" target="_blank">here</a> if you don't have it
                        running.
                    </div>
                </div>
            </div>
            <div class="col login-form">
                <div class="container-fluid login-form-container">
                    <div class="row login-button-row">
                        <div
                                class={!isLoading ? "metamask-auth-button hvr-sweep-to-right" : "metamask-auth-button"}
                                on:click={handleLogin}
                        >
                            {!isLoading ? "Connect" : "Connecting..."}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    .login-container {
        max-width: 800px;
        min-width: 700px;
        z-index: 100;
        box-shadow: 0 0 20px 5px rgba(0, 0, 0, 0.9);
    }

    .wrapper {
        min-height: 98vh;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }

    .login-row .col {
        min-height: 450px;
    }

    .login-description {
        background-color: #2b2b2b;
    }

    .login-form {
        background-color: #3c3f41;
    }

    .login-heading {
        font-family: 'Roboto Mono', monospace;
        color: #7caaaf;
        font-size: 45px;
        padding-left: 20px;
        padding-top: 35px;
        padding-bottom: 10px;
    }

    .login-disclaimer {
        font-family: 'Roboto Mono', monospace;
        color: #88ba55;
        font-size: 18px;
        padding-top: 20px;
        padding-left: 20px;
        padding-right: 20px;
    }

    .login-form-container {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }

    .metamask-auth-button {
        min-width: 300px;
        min-height: 60px;
        max-height: 60px;
        background-color: #2b2b2b;
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
        background-color: #F4852A;
    }
</style>
