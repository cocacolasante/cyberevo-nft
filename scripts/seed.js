const hre = require("hardhat");
const abi = require("../artifacts/contracts/CyberEvoNFT.sol/CyberEvo.json")
require("dotenv").config()

async function main() {
    const CyberEvo = await ethers.getContractAt(abi.abi, process.env.POLYGON_ADDRESS);
    console.log(`Cyber Evo Fetched at ${CyberEvo.address}`)

    const signer = new ethers.Wallet(process.env.MAINNET_DEPLOYER_PRIVATE, ethers.provider);

    const setMintFee = await CyberEvo.connect(signer).setMintFee(1)
    await setMintFee.wait()

    let tx = await CyberEvo.connect(signer).mint({value: 1})
    
    let res = await tx.wait()
    if(res.status == 1){
        console.log("success")
    }else{
        console.log("failed to seed mint")
    }

    const setMintFee2 = await CyberEvo.connect(signer).setMintFee(hre.ethers.utils.parseEther("30000000000000000"))
    await setMintFee2.wait()

    console.log(`Mint fee reset to "30000000000000000"`)

  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});