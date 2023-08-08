// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const contractFactory = await hre.ethers.getContractFactory("CyberEvo")
  const CyberEvo = await contractFactory.deploy("https://ipfs.io/ipfs/QmVXjMCb3QLssDJ6oq6n77vR7zPPTmNaj19n21uq2N6JSi/")
  await CyberEvo.deployed()

  console.log(`CyberEvo Deployed To: ${CyberEvo.address}`)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
