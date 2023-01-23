// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";

contract Certification is ERC721, ERC721Burnable {
    constructor() ERC721("Certification", "CTF") {}

    function mint(uint256 tokenId) public {
        _safeMint(msg.sender, tokenId);
    }
}
