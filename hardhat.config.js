require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config()

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  networks:{
    arbitrum_testnet:{
      url: process.env.ARB_TESTNET_URL,
      accounts: [process.env.TESTNET_DEPLOYER_PRIVATE]
    },
    arbitrum_main:{
      url: process.env.ARB_MAINNET,
      accounts: [process.env.MAINNET_DEPLOYER_PRIVATE]
    },
    mumbai:{
      url: process.env.MUMBAI_TESTNET,
      accounts: [process.env.MUMBAI_DEPLOYER]
    },
    polygon:{
      url: process.env.POLYGON_MAINNET,
      accounts: [process.env.MAINNET_DEPLOYER_PRIVATE]
    }
  },
  etherscan: {
    apiKey: process.env.ARBISCAN_API
}
};
