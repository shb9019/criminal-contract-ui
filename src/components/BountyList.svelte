<script>
    import Bounty from "./Bounty.svelte";
    import {address0, nodePort, publicAddress} from "../stores";
    import {getEncryptionName} from '../utils';
    import SubmitProof from "./SubmitKey.svelte";
    import {onMount} from "svelte";

    let web3;
    let contract;
    let publicAddressLocal;
    let nodePortLocal;
    let isLoggedInLocal;
    let bounties = [];
    let isLoading = false;
    let submitKeyIndex = -1;

    const publicAddressUnsubscribe = publicAddress.subscribe(value => {
        publicAddressLocal = value;
    });

    const nodePortUnsubscribe = nodePort.subscribe(value => {
        nodePortLocal = value;
    });

    const populateBounties = async () => {
        try {
            fetch(`http://localhost:${nodePortLocal}/read_contract_data`).then((response) => {
                return response.json();
            }).then((data) => {
                console.log(data);
                bounties = [];
                for (let publicKey in data) {
                    if (data.hasOwnProperty(publicKey)) {
                        bounties.push({
                            encType: "0",
                            cipherText: data[publicKey].input_url,
                            plainText: "",
                            contractor: data[publicKey].public_key,
                            perpetrator: (!data[publicKey].proof.perp_public_key) ? address0 : data[publicKey].proof.perp_public_key,
                            amount: data[publicKey].reward,
                            proof: data[publicKey].proof
                        });
                    }
                }

                // Svelte does not update for array methods like push
                bounties = bounties;
            });
        } catch (err) {
            alert("Something went wrong!");
        }
    };


    const resetSubmitKey = () => {
        submitKeyIndex = -1;
    };

    const setSubmitKey = (index) => {
        submitKeyIndex = index;
        console.log(submitKeyIndex);
    };

    const verifyProof = (proofLink, keyLink) => {
        const publicAddress = publicAddressLocal;
        const contractId = bounties[submitKeyIndex].contractor;
        const bid = 2;

        fetch(`http://localhost:${nodePortLocal}/submit_proof?public_key=${publicAddress}&contract_id=${contractId}&bid=${bid}&proof_url=${proofLink}&encrypted_url=${keyLink}`).then((response) => {
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

    const acceptKey = (index, status = 1) => {
        const publicAddress = publicAddressLocal;
        const contractId = bounties[index].contractor;

        fetch(`http://localhost:${nodePortLocal}/update_contract_state?public_key=${publicAddress}&contract_id=${contractId}&status=${status}`).then((response) => {
            return response.json();
        }).then((data) => {
            console.log(data.message_data);
            console.log(data.message_data);
            if (data.message_data.public_key) {
                if (status === 1) alert('Money has been transferred!');
                else alert('The key has been informed as being invalid!');
            } else {
                alert('Something went wrong!');
            }
        })
    };

    const rejectKey = (index) => {
        acceptKey(index, 0);
    };

    onMount(() => {
        populateBounties();
        setInterval(() => {
            populateBounties();
        }, 6000);
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
            reject={rejectKey}
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
