import {writable} from 'svelte/store';

export const isLoggedIn = writable(true);
export const publicAddress = writable("0xcafebabe");
export const isCreateBountyOpen = writable(false);

export const contractAbi = [
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "creator",
                "type": "address"
            }
        ],
        "name": "CreatedBounty",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "bounties",
        "outputs": [
            {
                "internalType": "uint32",
                "name": "encType",
                "type": "uint32"
            },
            {
                "internalType": "string",
                "name": "cipherText",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "plainText",
                "type": "string"
            },
            {
                "internalType": "address",
                "name": "contractor",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "perpetrator",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "creationDate",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint32",
                "name": "encType",
                "type": "uint32"
            },
            {
                "internalType": "string",
                "name": "cipherText",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "plainText",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "creationDate",
                "type": "uint256"
            }
        ],
        "name": "createBounty",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint32",
                "name": "index",
                "type": "uint32"
            }
        ],
        "name": "getBounty",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint32",
                        "name": "encType",
                        "type": "uint32"
                    },
                    {
                        "internalType": "string",
                        "name": "cipherText",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "plainText",
                        "type": "string"
                    },
                    {
                        "internalType": "address",
                        "name": "contractor",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "perpetrator",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "amount",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "creationDate",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct CriminalContractManager.Bounty",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getBountyCount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "count",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];
export const contractAddress = "0xf2c3971D9C619a94C18Effa76Bc0E049064CC7F0";
export const address0 = "0x0000000000000000000000000000000000000000";
