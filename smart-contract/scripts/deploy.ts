const hre = require("hardhat");

async function main() {
  let MessageBoard = await hre.ethers.getContractFactory("MessageBoard");
  MessageBoard = await MessageBoard.deploy();

  await MessageBoard.deployed();

  console.log(
    `Contract deployed to ${MessageBoard.address}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});