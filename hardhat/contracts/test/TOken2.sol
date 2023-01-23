// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Token2 is ERC721 {
    constructor() ERC721("Token2", "T2") {}

    function mint(uint256 tokenId) public {
        _safeMint(msg.sender, tokenId);
    }
}
