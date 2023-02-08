# ERC721-Multi-Linkable
Modification of the E7L standard for linking ERC721 tokens between them. 

## Description

This repo is a Dapp that shows the functionality of the the <b>ERC721MultiLinkable (E7ML) standard</b> , a modification of the original [ERC721Linkable](https://github.com/Racks-Labs/ERC721-Linkable) <b>(E7L)</b> standard developed by RacksLabs.

## Technical Specs
<ul>
  <li>The E7ML token can be linked to any ERC721 token that exists by calling the <code>linkToken</code> function</li>  
  <li>The E7ML token can't be transferred if it's not linked</li>
  <li>The E7ML token can't be unlinked</li>
  <li>If the parent token of the E7ML is transferred, calling the function <code>syncToken</code> on the E7ML it'll transfer the E7ML to the owner of the parent token </li>
  <li>Callign <code>tokenInfo</code> on the E7ML will return the struct MultiLinkable of that token</li>
<br>
  
```solidity
struct MultiLinkableToken {
  bool linked;
  address parentContract;
  uint256 parentTokenId;
}
```

  
</ul>


## Demo

Right now we're having some problems to ship the web to production but you can enjoy it by doing the next steps:
<ol>
  <li>Run <code>cd vite-project</code></li>
  <li>Run <code>yarn</code></li>  
  <li>Run <code>yarn dev</code> and the page will open in localhost</li>
</ol>
<br><br>
<table>
  <tr>
    <td><img src="https://user-images.githubusercontent.com/90318659/217578651-53f78705-82d2-4219-a50a-f8b98204ac1c.png"/></td>
    <td><img src="https://user-images.githubusercontent.com/90318659/217578709-91da57a7-bc3a-41ab-b524-3b2f640d3d38.png"/></td>
  </tr>
  <tr>
    <td><img src="https://user-images.githubusercontent.com/90318659/217578740-c424ea07-d8ee-42af-a6d7-a83aa68a4b19.png"/></td>
    <td><img src="https://user-images.githubusercontent.com/90318659/217578770-29c71fe4-15bf-4a41-9e41-9fff9c972fa0.png"/></td>
  </tr>
</table>
