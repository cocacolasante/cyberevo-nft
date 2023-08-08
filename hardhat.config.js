require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config()

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  networks:{
    arbitrum:{
      url: process.env.ARB_TESTNET_URL,
      accounts: [process.env.TESTNET_DEPLOYER_PRIVATE]
    }
  }
};
