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
                        let perpetratorKey = address0;
                        if (data[publicKey].proof) {
                            perpetratorKey = Object.keys(data[publicKey].proof)[0];
                        }
                        bounties.push({
                            encType: "0",
                            cipherText: data[publicKey].input_url,
                            plainText: "",
                            contractor: data[publicKey].public_key,
                            perpetrator: perpetratorKey,
                            amount: data[publicKey].reward,
                            proof: data[publicKey].proof,
                            is_open: data[publicKey].is_open
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
            if (!data.message_data.public_key) {
                alert('Invalid Proof!');
            } else {
                alert('Proof Accepted!');
            }
            resetSubmitKey();
        })
    };

    const acceptKey = (index, status = 1) => {
        const publicAddress = bounties[index].perpetrator;
        const contractId = bounties[index].contractor;

        fetch(`http://localhost:${nodePortLocal}/update_contract_state?public_key=${publicAddress}&contract_id=${contractId}&status=${status}`).then((response) => {
            return response.json();
        }).then((data) => {
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

    const raiseDispute = (index, keyUrl) => {
        const perpetrator = bounties[index].perpetrator;
        const contractor = bounties[index].contractor;
        const proof = bounties[index].proof;

        fetch(`http://localhost:${nodePortLocal}/dispute?disputer=P&public_key_perp=${perpetrator}&public_key_contract=${contractor}&revealed_key=${keyUrl}`).then((response) => {
            return response.json();
        }).then((data) => {
            if (data.message_data && data.message_data.disputed_accepted) {
                alert('You won the dispute!');
            } else {
                alert('Dispute failed!');
            }
        });
    };

    onMount(() => {
        populateBounties();
        setInterval(() => {
            populateBounties();
        }, 6000);
    });

</script>

{#if isLoading}
    <p class="loading"><i class="fa fa-spinner fa-spin fa-fw"></i> Fetching Bounties...</p>
{/if}
{#each bounties as bounty, i}
    {#if !bounty.isOpen || (bounty.isOpen === 1) || (bounty.isOpen === "1")}
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
                raiseDispute={raiseDispute}
                isOpen={bounty.isOpen}
        />
    {/if}
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
