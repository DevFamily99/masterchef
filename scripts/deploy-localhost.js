const fs = require('fs');
const path = require('path');
const { toBN } = require('./utils');
let result = {};

async function main() {
  const [owner] = await ethers.getSigners();
  console.log("owner:", owner.address);
  const feeAddress = owner.address;
  const rewardHolder = owner.address;

  result.feeAddress = feeAddress;
  result.rewardHolder = rewardHolder;

  const SimpleERC20 = await ethers.getContractFactory("SimpleERC20");

  console.log("Deploying ArcToken...");
  const arcToken = await SimpleERC20.deploy('Arc Token', 'ARC', 18);
  result.arcToken = arcToken.address;
  console.log("ArcToken deployed to:", arcToken.address);

  console.log("Deploying Uniswap...");
  const uniswap = await SimpleERC20.deploy('Uniswap V2', 'UNI-V2', 18);
  result.uniswap = uniswap.address;
  console.log("Uniswap deployed to:", uniswap.address);

  console.log("Deploying WETH...");
  const weth = await SimpleERC20.deploy('Wrapped Ether', 'WETH', 18);
  result.weth = weth.address;
  console.log("WETH deployed to:", weth.address);

  const ArcMasterChef = await ethers.getContractFactory("ArcMasterChef");
  console.log("Deploying ArcMasterChef...");
  const arcMasterChef = await ArcMasterChef.deploy();
  result.arcMasterChef = arcMasterChef.address;
  console.log("ArcMasterChef deployed to:", arcMasterChef.address);
  await arcMasterChef.deployed();

  console.log("ArcMasterChef: initialize...");
  const tx = await arcMasterChef.initialize(
    arcToken.address, // arc
    feeAddress, // feeAddress
    rewardHolder, // rewardHolder
    14159770, // startBlock
    '17000000000000000000' // arcPerBlock
  );

  await tx.wait();
  console.log("ArcMasterChef: initialize done.");

  console.log("ArcMasterChef: add uniswap...");
  await arcMasterChef.add(
    125, // allocPoint
    uniswap.address, // lpToken for uniswap
    0, // depositFeeBP
    0, // minDeposit
    true // withUpdate
  ); // UniswapV2Pair
  console.log("ArcMasterChef: uniswap, added");

  console.log("ArcMasterChef: add arc...");
  await arcMasterChef.add(
    75, // allocPoint
    arcToken.address, // lpToken for uniswap
    0, // depositFeeBP
    0, // minDeposit
    true // withUpdate
  ); // ArcToken //Arc Token (ARC)
  console.log("ArcMasterChef: arc, added");

  //                                                 123456789012345678
  const arcDeposit = toBN(10);
  const uniswapDeposit = toBN(0.1);
  console.log('arcToken: set allowance...');
  await arcToken.approve(arcMasterChef.address, arcDeposit);
  console.log('arcToken: set allowance, done');

  console.log('uniswap: set allowance...');
  await uniswap.approve(arcMasterChef.address, uniswapDeposit);
  console.log('arcToken: set allowance, done');
  
  console.log('deposit arc...');
  await arcMasterChef.deposit(1, arcDeposit, {
      gasLimit: 250000
  });
  console.log('deposit arc, finished');

  console.log('deposit uniswap...');
  await arcMasterChef.deposit(0, uniswapDeposit, {
      gasLimit: 250000
  });
  console.log('deposit uniswap, finished');

  fs.writeFileSync(path.resolve(__dirname, '..', 'report', 'masterchef-localhost.json'), JSON.stringify(result, null, 2));
}
  
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
