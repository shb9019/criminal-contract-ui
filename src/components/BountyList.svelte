<script>
    import Bounty from "./Bounty.svelte";
    import Web3 from "web3";
    import {contractAbi, contractAddress, publicAddress, isLoggedIn} from "../stores";
    import {getEncryptionName} from '../utils';

    let web3;
    let contract;
    let publicAddressLocal;
    let isLoggedInLocal;
    let bounties = [];
    let isLoading = false;

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

    $: if(isLoggedInLocal) {
        try {
            initiateWeb3().then(initiateContract).then(subscribeEvents).then(populateBounties);
        } catch (err) {
            console.log("Something went wrong!");
        }
    }

    $: console.log(bounties.length);

</script>

{#if isLoading}
    <p class="loading"> <i class="fa fa-spinner fa-spin fa-fw"></i> Fetching Bounties...</p>
{/if}
{#each bounties as bounty}
<Bounty encType={getEncryptionName(bounty.encType)}
        cipherText={bounty.cipherText}
        plainText={bounty.plainText}
        contractor={bounty.contractor}
        perpetrator={bounty.perpetrator}
        amount={web3.utils.fromWei(bounty.amount)}
/>
{/each}

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
