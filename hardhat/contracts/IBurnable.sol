// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.7;

interface IBurnable {
    function tokenURI(uint256 tokenId) external view returns (string memory);

    function getApproved(uint256 tokenId) external returns (address);

    function approve(address to, uint256 tokenId) external;

    function burn(uint256 tokenId) external;

    function ownerOf(uint256 tokenId) external view returns (address);
}
