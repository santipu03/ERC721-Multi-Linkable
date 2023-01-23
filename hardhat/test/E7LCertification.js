const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { deployBasic } = require("../utils/deployBasic");
const { arrayEquals } = require("../utils/functions");
const { expect } = require("chai");

describe("E7L Certification Contract", function () {
  let E7LCertification, oldCertification, token1, token2, account1, account2;

  async function deploy() {
    const deployed = await deployBasic();
    E7LCertification = deployed.E7LCertification;
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
      expect(await E7LCertification.owner()).to.be.equal(account1.address);
    });
    it("should set the right burnableContract", async function () {
      expect(await E7LCertification.burnableContract()).to.be.equal(
        oldCertification.address
      );
    });
  });

  describe("Mint()", function () {
    it("should burn an oldCertification token and mint a E7LCertification token", async function () {
      await oldCertification.approve(E7LCertification.address, 0);
      await E7LCertification.mint(0);
      expect(await E7LCertification.ownerOf(0)).to.be.equal(account1.address);
      await expect(oldCertification.ownerOf(0)).to.be.revertedWith(
        "ERC721: invalid token ID"
      );
    });

    it("should revert if the oldCertification token is not approved", async function () {
      await expect(E7LCertification.mint(0)).to.be.revertedWith(
        "ERC721: caller is not token owner or approved"
      );
    });

    it("should revert if caller is not owner of oldCertification token", async function () {
      await expect(E7LCertification.mint(1)).to.be.revertedWith(
        "E7LCertification: Not owner of burnable token"
      );
    });
  });

  describe("tokenURI()", function () {
    it("should return the correct URI", async function () {
      await oldCertification.approve(E7LCertification.address, 0);
      await E7LCertification.mint(0);
      expect(await E7LCertification.tokenURI(0)).to.be.equal("randomURI");
    });

    it("should revert if the token does not exist", async function () {
      await expect(E7LCertification.tokenURI(0)).to.be.revertedWith(
        "ERC721Metadata: URI query for nonexistent token"
      );
    });
  });

  describe("transferOwnership()", function () {
    it("should transfer the ownership correctly", async function () {
      await E7LCertification.transferOwnership(account2.address);
      expect(await E7LCertification.owner()).to.be.equal(account2.address);
    });
  });

  describe("walletOfOwner()", function () {
    it("should return the index of tokens for an owner", async function () {
      // Account1 mints oldCertification tokens (it already has number 0)
      await oldCertification.mint(4);
      await oldCertification.mint(14);
      await oldCertification.mint(25);

      // Approve all tokens to burn
      await oldCertification.approve(E7LCertification.address, 0);
      await oldCertification.approve(E7LCertification.address, 4);
      await oldCertification.approve(E7LCertification.address, 14);
      await oldCertification.approve(E7LCertification.address, 25);

      // Mint E7L tokens
      await E7LCertification.mint(0);
      await E7LCertification.mint(4);
      await E7LCertification.mint(14);
      await E7LCertification.mint(25);

      // Parse the results to INT and compare them
      const indexes = (
        await E7LCertification.walletOfOwner(account1.address)
      ).map((index) => parseInt(index));
      expect(arrayEquals(indexes, [0, 4, 14, 25])).to.be.true;
    });
  });
});
