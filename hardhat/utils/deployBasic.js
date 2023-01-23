const { ethers } = require("hardhat");

async function deployBasic() {
  const [account1, account2] = await ethers.getSigners();

  // Deploy the old Certifications contract to test the burning and minting
  const CERTIFICATION = await ethers.getContractFactory("Certification");
  const certification = await CERTIFICATION.deploy();

  // Deploy the E7L Certifications contract
  const E7L_CERTIFICATION_FACTORY = await ethers.getContractFactory(
    "E7LCertification"
  );
  const E7LCertification = await E7L_CERTIFICATION_FACTORY.deploy(
    "E7L",
    "E7L",
    " ",
    certification.address
  );

  // Deploy the basic implementation of the E7L contract
  const E7L_MOCK_FACTORY = await ethers.getContractFactory("E7LBasic");
  const E7LBasic = await E7L_MOCK_FACTORY.deploy("E7L", "E7L");

  // We deploy the test Tokens ERC721 to check the linking later
  const TOKEN1 = await ethers.getContractFactory("Token1");
  const token1 = await TOKEN1.deploy();
  const TOKEN2 = await ethers.getContractFactory("Token2");
  const token2 = await TOKEN2.deploy();

  return {
    E7LBasic,
    account1,
    account2,
    token1,
    token2,
    certification,
    E7LCertification,
  };
}

module.exports = { deployBasic };
