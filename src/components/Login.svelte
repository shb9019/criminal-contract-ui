<script>
    import Web3 from 'web3';
    import { recoverPersonalSignature } from 'eth-sig-util';
    import { bufferToHex } from 'ethereumjs-util';
    import { isLoggedIn, publicAddress } from '../stores.js';

    let web3 = undefined;
    let isLoading = false;
    let publicAddressLocal = undefined;

    const initiateWeb3 = async () => {
        if (!window.ethereum) {
            throw new Error('Please install MetaMask first.');
        }

        if (!web3) {
            try {
                // Request account access if needed
                await window.ethereum.enable();

                // We don't know window.web3 version, so we use our own instance of Web3
                // with the injected provider given by MetaMask
                web3 = new Web3(window.ethereum);
            } catch (error) {
                throw new Error('You need to allow MetaMask.');
            }
        }
    };

    const getPublicAddress = async () => {
        const coinbase = await web3.eth.getCoinbase();
        if (!coinbase) {
            throw new Error('Please activate MetaMask first.');
        }

        publicAddressLocal = coinbase.toLowerCase();
    };

    const handleSignMessage = async (nonce) => {
        try {
            const msg = `Sign your one-time nonce: ${nonce}`;
            const signature = await web3.eth.personal.sign(
                    `Sign your one-time nonce: ${nonce}`,
                    publicAddressLocal,
                    ''
            );

            return { publicAddressLocal, signature, msg };
        } catch (err) {
            throw new Error('You need to sign the message to be able to log in.');
        }
    };

    const verifySignature = async (signature, msg) => {
        const msgBufferHex = bufferToHex(Buffer.from(msg, 'utf8'));
        const address = recoverPersonalSignature({
            data: msgBufferHex,
            sig: signature,
        });
        if (address.toLowerCase() !== publicAddressLocal.toLowerCase()) {
            throw new Error("Invalid Signature - Authentication failed");
        }
    };

    const handleLogin = async () => {
        try {
            isLoading = true;
            await initiateWeb3();
            await getPublicAddress();
            const {signature, msg} = await handleSignMessage(100);
            await verifySignature(signature, msg);
            isLoggedIn.set(true);
            publicAddress.set(publicAddressLocal);
        } catch (error) {
            alert(error);
        }
        isLoading = false;
    };
</script>

<div class="wrapper">
    <div class="container-lg login-container">
        <div class="row login-row">
            <div class="col login-description">
                <div class="container-fluid login-description-container">
                    <div class="row login-heading">
                        Login
                    </div>
                    <div class="row login-disclaimer">
                        Make sure you have Metamask browser extension installed to authenticate the app!
                    </div>
                    <div class="row login-disclaimer">
                        Download from&nbsp;<a href="https://metamask.io/" target="_blank">here</a> if you don't have it installed.
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
                            {!isLoading ? "Login with Metamask" : "Loading..."}
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
