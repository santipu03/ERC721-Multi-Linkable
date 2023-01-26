// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Token1 is ERC721 {
    constructor() ERC721("Token1", "T1") {}

    function mint(uint256 tokenId) public {
        _safeMint(msg.sender, tokenId);
    }

    function _baseURI() internal pure override returns (string memory) {
        return "Qme8miFUJmsCgPU3wrz1afDzhysJBUGDbKMu5x8JzVLY3f";
    }
}
