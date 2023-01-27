const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { deployBasic } = require("../utils/deployBasic");
const { arrayEquals } = require("../utils/functions");
const { expect } = require("chai");

describe("E7ML Certification Contract", function () {
  let E7MLCertification, oldCertification, token1, token2, account1, account2;

  async function deploy() {
    const deployed = await deployBasic();
    E7MLCertification = deployed.E7MLCertification;
    oldCertification = deployed.oldCertification;
    token1 = deployed.token1;
    token2 = deployed.token2;
    account1 = deployed.account1;
    account2 = deployed.account2;

    // Mint old certification tokens to account1 and account2
    await oldCertification.mint(0);
    await oldCertification.connect(account2).mint(1);

    // Mint test tokens to account1 and account2
    await token1.mint(1);
    await token2.connect(account2).mint(1);
  }

  beforeEach(async function () {
    await loadFixture(deploy);
  });

  describe("Deployment", function () {
    it("should set the right owner", async function () {
      expect(await E7MLCertification.owner()).to.be.equal(account1.address);
    });
    it("should set the right burnableContract", async function () {
      expect(await E7MLCertification.burnableContract()).to.be.equal(
        oldCertification.address
      );
    });
  });

  describe("Mint()", function () {
    it("should burn an oldCertification token and mint a E7MLCertification token", async function () {
      await oldCertification.approve(E7MLCertification.address, 0);
      await E7MLCertification.mint(0);
      expect(await E7MLCertification.ownerOf(0)).to.be.equal(account1.address);
      await expect(oldCertification.ownerOf(0)).to.be.revertedWith(
        "ERC721: invalid token ID"
      );
    });

    it("should revert if the oldCertification token is not approved", async function () {
      await expect(E7MLCertification.mint(0)).to.be.revertedWith(
        "ERC721: caller is not token owner or approved"
      );
    });

    it("should revert if caller is not owner of oldCertification token", async function () {
      await expect(E7MLCertification.mint(1)).to.be.revertedWith(
        "E7MLCertification: Not owner of burnable token"
      );
    });
  });

  describe("tokenURI()", function () {
    it("should return the correct URI", async function () {
      await oldCertification.approve(E7MLCertification.address, 0);
      await E7MLCertification.mint(0);
      expect(await E7MLCertification.tokenURI(0)).to.be.equal("randomURI");
    });

    it("should revert if the token does not exist", async function () {
      await expect(E7MLCertification.tokenURI(0)).to.be.revertedWith(
        "ERC721Metadata: URI query for nonexistent token"
      );
    });
  });

  describe("transferOwnership()", function () {
    it("should transfer the ownership correctly", async function () {
      await E7MLCertification.transferOwnership(account2.address);
      expect(await E7MLCertification.owner()).to.be.equal(account2.address);
    });
  });

  describe("walletOfOwner()", function () {
    it("should return the index of tokens for an owner", async function () {
      // Account1 mints oldCertification tokens (it already has number 0)
      await oldCertification.mint(4);
      await oldCertification.mint(14);
      await oldCertification.mint(25);

      // Approve all tokens to burn
      await oldCertification.approve(E7MLCertification.address, 0);
      await oldCertification.approve(E7MLCertification.address, 4);
      await oldCertification.approve(E7MLCertification.address, 14);
      await oldCertification.approve(E7MLCertification.address, 25);

      // Mint E7ML tokens
      await E7MLCertification.mint(0);
      await E7MLCertification.mint(4);
      await E7MLCertification.mint(14);
      await E7MLCertification.mint(25);

      // Parse the results to INT and compare them
      const indexes = (
        await E7MLCertification.walletOfOwner(account1.address)
      ).map((index) => parseInt(index));
      expect(arrayEquals(indexes, [0, 4, 14, 25])).to.be.true;
    });
  });
});
