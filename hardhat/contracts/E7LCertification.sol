// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.7;

import "./ERC721MultiLinkable.sol";
import "./IBurnable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract E7LCertification is ERC721MultiLinkable, ERC721Enumerable {
    string private URI;
    address public owner;
    address public burnableContract;

    modifier onlyOwner() {
        require(msg.sender == owner, "E7LCertification: Not owner");
        _;
    }

    constructor(
        string memory _name,
        string memory _symbol,
        string memory _URI,
        address _burnableContract
    ) ERC721MultiLinkable(_name, _symbol) {
        owner = msg.sender;
        burnableContract = _burnableContract;
        URI = _URI;
    }

    // This function requires that tokenId is approved
    function mint(uint256 tokenId) public {
        require(IBurnable(burnableContract).ownerOf(tokenId) == msg.sender);
        IBurnable(burnableContract).burn(tokenId);
        _safeMint(msg.sender, tokenId);
    }

    function _baseURI() internal view virtual override returns (string memory) {
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

    function walletOfOwner(
        address _owner
    ) public view returns (uint256[] memory) {
        uint256 ownerTokenCount = balanceOf(_owner);
        uint256[] memory tokenIds = new uint256[](ownerTokenCount);
        for (uint256 i; i < ownerTokenCount; ++i) {
            tokenIds[i] = tokenOfOwnerByIndex(_owner, i);
        }
        return tokenIds;
    }

    function transferOwnership(address _newOwner) public onlyOwner {
        require(_newOwner != msg.sender, "Cannot be the same wallet");
        owner = _newOwner;
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId,
        uint256 batchSize
    ) internal virtual override(ERC721Enumerable, ERC721MultiLinkable) {
        ERC721MultiLinkable._beforeTokenTransfer(from, to, tokenId, batchSize);
        ERC721Enumerable._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    function supportsInterface(
        bytes4 interfaceId
    )
        public
        view
        virtual
        override(ERC721Enumerable, ERC721MultiLinkable)
        returns (bool)
    {
        return
            ERC721Enumerable.supportsInterface(interfaceId) ||
            ERC721MultiLinkable.supportsInterface(interfaceId);
    }
}
