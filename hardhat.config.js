const { version } = require("chai")

require("dotenv").config()

require("@nomiclabs/hardhat-etherscan")
require("@nomiclabs/hardhat-waffle")
require("hardhat-gas-reporter")
require("solidity-coverage")
require("hardhat-deploy")

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
    const accounts = await hre.ethers.getSigners()

    for (const account of accounts) {
        console.log(account.address)
    }
})

const PRIVATE_KEY =
    process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : []

module.exports = {
    solidity: {
        compilers: [
            {
                version: "0.8.8",
            },
            {
                version: "0.6.7",
            },
            {
                version: "0.7.0",
            },
        ],
    },
    defaultNetwork: "hardhat",
    networks: {
        hardhat: {
            chainId: 31337,
            // gasPrice: 130000000000,
        },
        ropsten: {
            url: process.env.ROPSTEN_RPC_URL || "",
            accounts: PRIVATE_KEY,
        },
        rinkeby: {
            url: process.env.RINKEBY_RPC_URL || "",
            accounts: PRIVATE_KEY,
            chainId: 4,
            blockConfirmations: 6,
        },
        kovan: {
            url: process.env.KOVAN_RPC_URL || "",
            accounts: PRIVATE_KEY,
        },
    },
    gasReporter: {
        enabled: true,
        currency: "USD",
        outputFile: "gas-report.txt",
        noColors: true,
        coinmarketcap: process.env.COINMARKETCAP_API_KEY || "",
    },
    etherscan: {
        apiKey: process.env.ETHERSCAN_API_KEY || "",
    },
    namedAccounts: {
        deployer: {
            default: 0,
            1: 0,
        },
    },
}
