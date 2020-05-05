pragma solidity >=0.4.22 <0.7.0;
pragma experimental ABIEncoderV2;

/**
 * @title CriminalContractManager
 * @dev Manages users in the Criminal Contract
 */
contract CriminalContractManager {

    struct Bounty {
        uint32 encType;
        string cipherText;
        string plainText;
        address contractor;
        address perpetrator;
        uint256 amount;
        uint256 creationDate;
    }

    Bounty[] public bounties;

    /**
     * @dev Event to emit when a bounty is created
     * @param creator Address of the one who submitted the bounty
     */
    event CreatedBounty(address creator);

    /**
     * @dev Create a new bounty to the list of bounties. Cannot send a bounty with no incentive.
     * @param encType Encryption Type. Currently only supports 'aes-128'
     * @param cipherText Cipher text whose key is to be cracked
     * @param plainText plain text corresponding to cipher text
     */
    function createBounty(uint32 encType, string memory cipherText, string memory plainText, uint256 creationDate) public payable {
        require(msg.value != 0, "Bounty cannot be free!");
        require(encType < 4, "Unsupported Encryption type");

        bounties.push(Bounty({
            encType: encType,
            cipherText: cipherText,
            plainText: plainText,
            contractor: msg.sender,
            perpetrator: address(0),
            amount: msg.value,
            creationDate: creationDate
            }));

        emit CreatedBounty(msg.sender);
    }

    /**
     * @dev Get number of bounties in the bounties array
     */
    function getBountyCount() public view returns(uint count) {
        return bounties.length;
    }

    /**
     * @dev Get number of bounties in the bounties array
     */
    function getBounty(uint32 index) public view returns(Bounty memory) {
        return bounties[index];
    }
}
