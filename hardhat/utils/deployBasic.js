const { ethers } = require("hardhat");

async function deployBasic() {
  const [account1, account2] = await ethers.getSigners();

  // Deploy the old Certifications contract to test the burning and minting
  const CERTIFICATION = await ethers.getContractFactory("Certification");
  const oldCertification = await CERTIFICATION.deploy();

  // Deploy the E7ML Certifications contract
  const E7ML_CERTIFICATION_FACTORY = await ethers.getContractFactory(
    "E7MLCertification"
  );
  const E7MLCertification = await E7ML_CERTIFICATION_FACTORY.deploy(
    "E7ML",
    "E7ML",
    "randomURI",
    oldCertification.address
  );

  // Deploy the basic implementation of the E7ML contract
  const E7ML_MOCK_FACTORY = await ethers.getContractFactory("E7MLBasic");
  const E7MLBasic = await E7ML_MOCK_FACTORY.deploy("E7ML", "E7ML");

  // We deploy the test Tokens ERC721 to check the linking later
  const TOKEN1 = await ethers.getContractFactory("Token1");
  const token1 = await TOKEN1.deploy();
  const TOKEN2 = await ethers.getContractFactory("Token2");
  const token2 = await TOKEN2.deploy();

  return {
    E7MLBasic,
    account1,
    account2,
    token1,
    token2,
    oldCertification,
    E7MLCertification,
  };
}

module.exports = { deployBasic };
