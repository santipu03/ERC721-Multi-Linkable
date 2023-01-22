// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.16;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "./MultiLinkable.sol";

interface IERC721MultiLinkable is IERC721 {
    event Link(uint256 tokenId, address parentContract, uint256 parentTokenId);

    function tokenInfo(
        uint256 tokenId
    ) external view returns (MultiLinkableToken memory);

    function linkToken(
        uint256 tokenId,
        address parentContract,
        uint256 parentTokenId
    ) external;

    function syncToken(uint256 token) external;
}
