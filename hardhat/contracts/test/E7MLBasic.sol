// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.7;

import "../ERC721MultiLinkable.sol";

contract E7MLBasic is ERC721MultiLinkable {
    constructor(
        string memory _name,
        string memory _symbol
    ) ERC721MultiLinkable(_name, _symbol) {}

    function mint(uint256 tokenId) public {
        _safeMint(msg.sender, tokenId);
    }
}
