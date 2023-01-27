const hre = require("hardhat");
const { run, network } = require("hardhat");

const DEVELOPMENT_CHAINS = ["hardhat", "locahost"];

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
  console.log("Deploying E7MLCertification");

  const E7ML_CERTIFICATION = await hre.ethers.getContractFactory(
    "E7MLCertification"
  );
  const E7MLCertification = await E7ML_CERTIFICATION.deploy(
    "E7MLCertification",
    "E7ML",
    "QmTN8dyrcjFcgoeDndKfNDRUhRoB9Gkanb2Hma5rUxXNpg",
    certification.address
  );
  await E7MLCertification.deployTransaction.wait(6);
  console.log("E7MLCertification Deployed!!");

  // VERIFY E7ML in etherscan if we are not in localhost
  if (
    !DEVELOPMENT_CHAINS.includes(network.name) &&
    process.env.ETHERSCAN_API_KEY
  ) {
    console.log(`Verifying contract on Etherscan...`);
    try {
      await run(`verify:verify`, {
        address: E7MLCertification.address,
        constructorArguments: [
          "E7MLCertification",
          "E7ML",
          "QmTN8dyrcjFcgoeDndKfNDRUhRoB9Gkanb2Hma5rUxXNpg",
          certification.address,
        ],
      });
    } catch (e) {
      if (e.message.toLowerCase().includes("already verified")) {
        console.log("Already verified!");
      } else {
        console.log(e);
      }
    }
  }

  console.log("----------------------");
  console.log(`Token1 Address: ${token1.address}`);
  console.log(`Old Certification Address: ${certification.address}`);
  console.log(`E7MLCertification Address ${E7MLCertification.address}`);
  console.log("----------------------");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
