const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { deployBasic } = require("../utils/deployBasic");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("E7L Basic Implementation", function () {
  let E7LBasic, token1, token2, account1, account2;

  async function deploy() {
    const deployed = await deployBasic();
    E7LBasic = deployed.E7LBasic;
    token1 = deployed.token1;
    token2 = deployed.token2;
    account1 = deployed.account1;
    account2 = deployed.account2;

    // Mint E7L tokens to account1 and account2
    await E7LBasic.mint(0);
    await E7LBasic.connect(account2).mint(1);

    // Mint test tokens to account1 and account2
    await token1.mint(1);
    await token2.connect(account2).mint(1);
  }

  beforeEach(async function () {
    await loadFixture(deploy);
  });

  describe("Deployment", function () {
    it("should check ownership of token 0", async function () {
      expect(await E7LBasic.ownerOf(0)).to.equal(account1.address);
    });
  });

  describe("linkToken()", function () {
    it("should not be linked", async function () {
      const res = await E7LBasic.tokenInfo(0);
      expect(res.linked).to.be.false;
      expect(res.parentTokenId).to.be.equal(0);
      expect(res.parentContract).to.be.equal(ethers.constants.AddressZero);
    });

    it("should link token", async function () {
      await E7LBasic.linkToken(0, token1.address, 1);
      const res = await E7LBasic.tokenInfo(0);
      expect(res.linked).to.be.true;
      expect(res.parentTokenId).to.be.equal(1);
      expect(res.parentContract).to.be.equal(token1.address);
    });

    it("should emit Link event", async function () {
      expect(await E7LBasic.linkToken(0, token1.address, 1))
        .to.emit(E7LBasic, "Link")
        .withArgs(0, token1.address, 1);
    });

    it("should revert with invalid token ID", async function () {
      await expect(E7LBasic.linkToken(0, token1.address, 2)).to.be.revertedWith(
        "ERC721: invalid token ID"
      );
    });

    it("Should revert with token already linked", async function () {
      await E7LBasic.linkToken(0, token1.address, 1);
      await expect(E7LBasic.linkToken(0, token1.address, 1)).to.be.revertedWith(
        "ERC721MultiLinkable: token is already linked"
      );
    });

    it("Should revert with caller is not owner nor aproved of E7L token", async function () {
      await expect(E7LBasic.linkToken(1, token2.address, 1)).to.be.revertedWith(
        "ERC721: caller is not token owner nor approved"
      );
    });

    it("Should revert with caller is not owner of ParentToken", async function () {
      await expect(E7LBasic.linkToken(0, token2.address, 1)).to.be.revertedWith(
        "ERC721MultiLinkable: token owners do not match"
      );
    });
  });

  describe("syncToken()", function () {
    it("should NOT transfer E7L token when transferring parentToken", async function () {
      await E7LBasic.linkToken(0, token1.address, 1);
      await token1.transferFrom(account1.address, account2.address, 1);
      expect(await token1.ownerOf(1)).to.be.equal(account2.address);
      expect(await E7LBasic.ownerOf(0)).to.be.equal(account1.address);
    });

    it("should transfer E7L token when when transferring parentToken AND calling syncToken", async function () {
      await E7LBasic.linkToken(0, token1.address, 1);
      await token1.transferFrom(account1.address, account2.address, 1);
      await E7LBasic.syncToken(0);
      expect(await E7LBasic.ownerOf(0)).to.be.equal(account2.address);
    });

    it("should revert if token is already synced", async function () {
      await E7LBasic.linkToken(0, token1.address, 1);
      await expect(E7LBasic.syncToken(0)).to.be.revertedWith(
        "ERC721MultiLinkable: token already synced"
      );
    });
  });

  describe("_beforeTokenTransfer()", function () {
    it("Should revert with is not linked", async function () {
      await expect(
        E7LBasic.transferFrom(account1.address, account2.address, 0)
      ).to.be.revertedWith(
        "ERC721MultiLinkable: cannot transfer token because is not linked"
      );
    });

    it("Should revert with invalid address", async function () {
      await E7LBasic.linkToken(0, token1.address, 1);
      await expect(
        E7LBasic.transferFrom(account1.address, account2.address, 0)
      ).to.be.revertedWith(
        "ERC721MultiLinkable: invalid address. Use syncToken()"
      );
    });
  });

  describe("tokenInfo()", function () {
    it("should revert with invalid token ID", async function () {
      await expect(E7LBasic.tokenInfo(3)).to.be.revertedWith(
        "ERC721: invalid token ID"
      );
    });
  });
});
