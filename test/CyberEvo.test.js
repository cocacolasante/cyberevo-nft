const { expect } = require("chai");
const {ethers} = require("hardhat")

describe("CyberEvo NFT", () =>{
    let CyberEvo, deployer, user1, user2, mintFee
    beforeEach(async () =>{
        [deployer, user1, user2] = await ethers.getSigners()

        const contractFactory = await ethers.getContractFactory("CyberEvo")
        CyberEvo = await contractFactory.deploy("https://ipfs.io/ipfs/QmVXjMCb3QLssDJ6oq6n77vR7zPPTmNaj19n21uq2N6JSi/")
        await CyberEvo.deployed()

        // console.log(`Contract deployed to ${CyberEvo.address}`)
    })
    it("checks the deployer", async () =>{
        expect(await CyberEvo.deployer()).to.equal(deployer.address)
    })
    describe("Mint function", () =>{
        beforeEach(async () =>{
            mintFee = await CyberEvo.mintFee()

            await CyberEvo.connect(user1).mint({value: mintFee})
            await CyberEvo.connect(user1).mint({value: mintFee})
            await CyberEvo.connect(user1).mint({value: mintFee})

        })
        it("checks the token owner", async () =>{
            expect(await CyberEvo.ownerOf(1)).to.equal(user1.address)
        })
        it("checks the funds were transferred to the smart contract", async () =>{
            expect(await ethers.provider.getBalance(CyberEvo.address)).to.equal(BigInt(mintFee * 3))
        })
        it("checks the token uri", async () =>{
            expect(await CyberEvo.tokenURI(1)).to.equal("https://ipfs.io/ipfs/QmVXjMCb3QLssDJ6oq6n77vR7zPPTmNaj19n21uq2N6JSi/1.json")
            expect(await CyberEvo.tokenURI(2)).to.equal("https://ipfs.io/ipfs/QmVXjMCb3QLssDJ6oq6n77vR7zPPTmNaj19n21uq2N6JSi/2.json")
            expect(await CyberEvo.tokenURI(3)).to.equal("https://ipfs.io/ipfs/QmVXjMCb3QLssDJ6oq6n77vR7zPPTmNaj19n21uq2N6JSi/3.json")
        })
        it("checks the set minting fee", async () =>{
            await CyberEvo.connect(deployer).setMintFee(1)
            expect(await CyberEvo.mintFee()).to.equal(1)
        })
        it("checks the withdraw function", async () =>{
            let initialBalance = await ethers.provider.getBalance(deployer.address)
            initialBalance = BigInt(initialBalance)
            
            await CyberEvo.connect(deployer).withdrawFunds()

            let finalBalance = await ethers.provider.getBalance(deployer.address)

            expect(finalBalance).to.be.greaterThan(initialBalance)
        })

    })
})