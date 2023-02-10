# ERC721-Multi-Linkable (E7ML)
A new way of Linking 2.0 

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

To test and show the use of the ERC-721 MultiLinkable standard I've created a frontend so that any user can easily interact with the test E7ML token I've deployed. <br>

### Learning by doing
The steps to follow in the demo are the following (The <i>italic</i> is indicating in which tab of the page you can do the step):
<ol>
  <li>Receive an NFT that represents a Certification for a web3 course (<i>Airdrops</i> tab)</li>
  <li><b>Mint the E7ML token</b> by burning the Certification NFT (<i>Mint E7ML</i> tab)</li>
  <li>Receive TOKEN1, a test ERC721 token that we'll use to link the E7ML (<i>Airdrops</i> tab)</li>
  <li><b>Link the E7ML</b> with the TOKEN1 (<i>Link E7ML</i> tab)</li>
  <li>Check the E7ML tokens you have and see if they're linked or not (<i>Your Wallet</i> tab)</li>
</ol>

### Run it locally 

Right now I'm having some problems to ship the web to production but you can enjoy it by doing the next steps:
<ol>
  <li>Run <code>cd vite-project</code></li>
  <li>Run <code>yarn</code></li>  
  <li>Run <code>yarn dev</code> and the page will open in localhost</li>
  <li>Run <code>yarn hardhat test</code> in the <code>hardhat</code> folder to run the tests
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
<br><br>

## Deployed Contracts

All the contracts are deployed in the Goerli testnet.

 - E7ML token: [0x734f8Fca5EEce762BaEDD2831d93EE300733579F](https://goerli.etherscan.io/address/0x734f8Fca5EEce762BaEDD2831d93EE300733579F)
 - TOKEN1: [0x883aAaeEdB3E74C7D765B2beF31823Fd4B479a19](https://goerli.etherscan.io/address/0x883aAaeEdB3E74C7D765B2beF31823Fd4B479a19)
 - Certification: [0x62205E0359c17dB532E0fA2aAFf494Db93c92d55](https://goerli.etherscan.io/address/0x62205E0359c17dB532E0fA2aAFf494Db93c92d55)


