// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Token1 is ERC721 {
    string private URI = "Qme8miFUJmsCgPU3wrz1afDzhysJBUGDbKMu5x8JzVLY3f";

    constructor() ERC721("Token1", "T1") {}

    function mint(uint256 tokenId) public {
        _safeMint(msg.sender, tokenId);
    }

    function _baseURI() internal view override returns (string memory) {
        return URI;
    }

    function tokenURI(
        uint256 tokenId
    ) public view virtual override returns (string memory) {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );

        return URI;
    }
}
