// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.16;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./IERC721MultiLinkable.sol";
import "./MultiLinkable.sol";

abstract contract ERC721MultiLinkable is ERC721, IERC721MultiLinkable {
    // mapping from tokenId to MultiLinkableToken struct
    mapping(uint256 => MultiLinkableToken) private _tokensInfo;

    constructor(
        string memory _name,
        string memory _symbol
    ) ERC721(_name, _symbol) {}

    /**
     * @notice See {IERC165-supportsInterface}.
     */
    function supportsInterface(
        bytes4 interfaceId
    ) public view virtual override(IERC165, ERC721) returns (bool) {
        return
            interfaceId == type(IERC721MultiLinkable).interfaceId ||
            super.supportsInterface(interfaceId);
    }

    /**
     * @notice Function that returns the token info for a specific tokenId
     */
    function tokenInfo(
        uint256 tokenId
    ) public view virtual override returns (MultiLinkableToken memory) {
        require(_exists(tokenId) == true, "ERC721: invalid token ID");
        return _tokensInfo[tokenId];
    }

    /**
     * @notice functions that links a tokenId form erc721multilinkable token to
     * another tokenId of the parent ERC721 contract
     * emits link event
     */
    function linkToken(
        uint256 tokenId,
        address parentContract,
        uint256 parentTokenId
    ) external {
        MultiLinkableToken storage token = _tokensInfo[tokenId];
        IERC721 ERC721ParentContract = IERC721(parentContract);

        require(
            super.ownerOf(tokenId) ==
                ERC721ParentContract.ownerOf(parentTokenId),
            "ERC721MultiLinkable: token owners do not match"
        );
        require(!token.linked, "ERC721MultiLinkable: token is already linked");
        require(
            _isApprovedOrOwner(_msgSender(), tokenId),
            "ERC721: caller is not token owner nor approved"
        );

        token.parentTokenId = parentTokenId;
        token.parentContract = parentContract;
        token.linked = true;
        emit Link(tokenId, parentContract, parentTokenId);
    }

    /**
     * @notice Function that syncs the ownership of a token of the child contract
     * when linked token is transferred
     */
    function syncToken(uint256 tokenId) public virtual override {
        IERC721 parentContract = IERC721(_tokensInfo[tokenId].parentContract);
        require(
            super.ownerOf(tokenId) !=
                parentContract.ownerOf(_tokensInfo[tokenId].parentTokenId),
            "ERC721MultiLinkable: token already synced"
        );
        _safeTransfer(
            super.ownerOf(tokenId),
            parentContract.ownerOf(_tokensInfo[tokenId].parentTokenId),
            tokenId,
            ""
        );
    }

    /**
     * @dev override of _beforeTokenTransfer hook to only allow transfers to the owner
     * of the linked tokenId of the parent contract
     */
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId,
        uint256 batchSize
    ) internal virtual override {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
        if (_exists(tokenId)) {
            IERC721 parentContract = IERC721(
                _tokensInfo[tokenId].parentContract
            );
            require(
                _tokensInfo[tokenId].linked == true,
                "ERC721MultiLinkable: cannot transfer token because is not linked"
            );
            require(
                from == super.ownerOf(tokenId) &&
                    to ==
                    parentContract.ownerOf(_tokensInfo[tokenId].parentTokenId),
                "ERC721MultiLinkable: invalid address. Use syncToken()"
            );
        }
    }
}
