// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.16;

struct MultiLinkableToken {
    bool linked;
    address parentContract;
    uint256 parentTokenId;
}
