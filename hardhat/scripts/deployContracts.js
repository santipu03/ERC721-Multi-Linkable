const hre = require("hardhat");

async function main() {
  console.log("Deploying Token1...");
  const TOKEN1 = await hre.ethers.getContractFactory("Token1");
  const token1 = await TOKEN1.deploy();
  await token1.deployed();

  console.log("Token1 deployed!!");
  console.log("Deploying Old Certification...");

  const CERTIFICATION = await hre.ethers.getContractFactory("Certification");
  const certification = await CERTIFICATION.deploy();
  await certification.deployed();

  console.log("Old Certification deployed!!");
  console.log("Deploying E7LCertification");

  const E7L_CERTIFICATION = await hre.ethers.getContractFactory(
    "E7LCertification"
  );
  const E7LCertification = await E7L_CERTIFICATION.deploy(
    "E7LCertification",
    "E7L",
    "QmTN8dyrcjFcgoeDndKfNDRUhRoB9Gkanb2Hma5rUxXNpg",
    certification.address
  );
  await E7LCertification.deployed();

  console.log("E7LCertification Deployed!!");

  console.log("----------------------");
  console.log(`Token1 Address: ${token1.address}`);
  console.log(`Old Certification Address: ${certification.address}`);
  console.log(`E7LCertification Address ${E7LCertification.address}`);
  console.log("----------------------");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
