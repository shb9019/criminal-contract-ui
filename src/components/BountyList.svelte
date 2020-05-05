<script>
    import Bounty from "./Bounty.svelte";
    import Web3 from "web3";
    import {contractAbi, contractAddress, publicAddress, isLoggedIn} from "../stores";
    import {getEncryptionName} from '../utils';
    import SubmitProof from "./SubmitKey.svelte";

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

    const isLoggedInUnsubscribe = isLoggedIn.subscribe(value => {
        isLoggedInLocal = value;
    });

    const initiateWeb3 = async () => {
        if (!window.ethereum) {
            throw new Error('Please install MetaMask first.');
        }

        if (!web3) {
            try {
                await window.ethereum.enable();
                web3 = new Web3(window.ethereum);
            } catch (error) {
                throw new Error('You need to allow MetaMask.');
            }
        }
    };

    const initiateContract = async () => {
        contract = new web3.eth.Contract(contractAbi, contractAddress, {from: publicAddressLocal});
    };

    const populateBounties = async () => {
        isLoading = true;
        try {
            const bountyCount = await contract.methods.getBountyCount().call();
            for (let index = 0; index < bountyCount; index++) {
                const bounty = await contract.methods.getBounty(index).call();
                bounties.push(bounty);
            }
        } catch (err) {
            alert("Something went wrong!");
        }
        // Svelte does not update for array methods like push
        bounties = bounties;
        isLoading = false;
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
        const encType = bounties[submitKeyIndex].encType;
        const cipherText = bounties[submitKeyIndex].cipherText;
        const plainText = bounties[submitKeyIndex].plainText;
        console.log(encType, cipherText, plainText, proof);
        // TODO: Verify Proof by submitting to others
    };

    $: if (isLoggedInLocal) {
        try {
            initiateWeb3().then(initiateContract).then(subscribeEvents).then(populateBounties);
        } catch (err) {
            alert("Something went wrong!");
        }
    }

</script>

{#if isLoading}
    <p class="loading"> <i class="fa fa-spinner fa-spin fa-fw"></i> Fetching Bounties...</p>
{/if}
{#each bounties as bounty, i}
<Bounty encType={getEncryptionName(bounty.encType)}
        cipherText={bounty.cipherText}
        plainText={bounty.plainText}
        contractor={bounty.contractor}
        perpetrator={bounty.perpetrator}
        amount={web3.utils.fromWei(bounty.amount)}
        submit={() => setSubmitKey(i)}
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
