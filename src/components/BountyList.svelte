<script>
    import Bounty from "./Bounty.svelte";
    import {address0, publicAddress} from "../stores";
    import {getEncryptionName} from '../utils';
    import SubmitProof from "./SubmitKey.svelte";
    import {onMount} from "svelte";

    let web3;
    let contract;
    let publicAddressLocal;
    let isLoggedInLocal;
    let bounties = [];
    let isLoading = false;
    let submitKeyIndex = -1;

    const publicAddressUnsubscribe = publicAddress.subscribe(value => {
        publicAddressLocal = value;
    });

    const populateBounties = async () => {
        isLoading = true;
        try {
            fetch('http://localhost:7777/read_contract_data').then((response) => {
                return response.json();
            }).then((data) => {
                console.log(data);
                for (let publicKey in data) {
                    if (data.hasOwnProperty(publicKey)) {
                        bounties.push({
                            encType: "0",
                            cipherText: data[publicKey].input_url,
                            plainText: "",
                            contractor: publicKey,
                            perpetrator: (!data[publicKey].proof.perp_public_key) ? address0 : data[publicKey].proof.perp_public_key,
                            amount: data[publicKey].reward,
                            proof: data[publicKey].proof
                        });
                        console.log(publicKey, data[publicKey]);
                    }
                }

                console.log(bounties);
                // Svelte does not update for array methods like push
                bounties = bounties;
                isLoading = false;
            });
        } catch (err) {
            alert("Something went wrong!");
        }
    };

    const subscribeEvents = async () => {
        contract.events.CreatedBounty((err, events) => {
            bounties = [];
            if (!err) {
                populateBounties();
            }
        })
    };

    const resetSubmitKey = () => {
        submitKeyIndex = -1;
    };

    const setSubmitKey = (index) => {
        submitKeyIndex = index;
        console.log(submitKeyIndex);
    };

    const verifyProof = (proof) => {
        const publicAddress = publicAddressLocal;
        const contractId = bounties[submitKeyIndex].contractor;
        const bid = 2;
        const proofUrl = '11w67P/aes_decrypt.proof';
        const validKey = 'D9eYk/exo2';

        fetch(`http://localhost:7777/submit_proof?public_key=${publicAddress}&contract_id=${contractId}&bid=${bid}&proof_url=${proofUrl}&encrypted_url=${validKey}`).then((response) => {
            return response.json();
        }).then((data) => {
            console.log(data.message_data);
            if (!data.message_data.public_key) {
                alert('Invalid Proof!');
            } else {
                alert('Proof Accepted!');
            }
        })
    };

    const acceptKey = (index) => {
        const publicAddress = publicAddressLocal;
        const contractId = bounties[index].contractor;
        const status = 1;

        fetch(`http://localhost:7777/update_contract_state?public_key=${publicAddress}&contract_id=${contractId}&status=${status}`).then((response) => {
            return response.json();
        }).then((data) => {
            console.log(data.message_data);
            console.log(data.message_data);
            if (data.message_data.public_key) {
                alert('Money has been transferred!');
            } else {
                alert('Something went wrong!');
            }
        })
    };

    onMount(() => {
        bounties = [];
        populateBounties();
    })

</script>

{#if isLoading}
    <p class="loading"><i class="fa fa-spinner fa-spin fa-fw"></i> Fetching Bounties...</p>
{/if}
{#each bounties as bounty, i}
    <Bounty encType={getEncryptionName(bounty.encType)}
            cipherText={bounty.cipherText}
            plainText={bounty.plainText}
            contractor={bounty.contractor}
            perpetrator={bounty.perpetrator}
            amount={bounty.amount}
            submit={setSubmitKey}
            proof={bounty.proof}
            index={i}
            accept={acceptKey}
    />
{/each}
{#if submitKeyIndex !== -1}
    <SubmitProof close={resetSubmitKey} verifyProof={verifyProof}/>
{/if}

<style>
    .loading {
        color: white;
        font-family: 'Roboto Mono', monospace;
        font-size: 30px;
        width: 100%;
        text-align: center;
        padding: 20px;
    }
</style>
