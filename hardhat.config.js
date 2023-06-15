// require('@openzeppelin/hardhat-upgrades');
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");

const { alchemyApiKey, privateKeys,  etherscanApiKey} = require('./secrets.json');
// require("@nomiclabs/hardhat-ethers");
// require('@openzeppelin/hardhat-upgrades');

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  // solidity: "0.7.3",
  solidity: {
    compilers: [
      {
        version: "0.6.6",
      },
      {
        version: "0.6.12",
      },
      {
        version: "0.7.4",
        settings: {},
      },
      {
        version: "0.8.0",
        settings: {},
      },
    ],
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    rinkeby: {
      url: `https://eth-rinkeby.alchemyapi.io/v2/${alchemyApiKey}`,
      accounts: privateKeys,
    },
    goerli: {
      url: `https://eth-goerli.alchemyapi.io/v2/${alchemyApiKey}`,
      accounts: privateKeys,
    },
    mainnet: {
      url: `https://eth-mainnet.alchemyapi.io/v2/${alchemyApiKey}`,
      accounts: privateKeys,
    }
  },
  etherscan: {
    apiKey: {
      rinkeby: etherscanApiKey,
      mainnet: etherscanApiKey
    }
  }
};
