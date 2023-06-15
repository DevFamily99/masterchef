// Load dependencies
const { expect } = require('chai');
 
let ArcMasterChef;
let arcMasterChef;
 
// Start test block
describe('ArcMasterChef', function () {
  before(async function () {
    const [owner, addr1, addr2] = await ethers.getSigners();
    console.log("owner:", owner.address);
    ArcMasterChef = await ethers.getContractFactory("ArcMasterChef");
    arcMasterChef = await ArcMasterChef.deploy();
    await arcMasterChef.deployed();
    await arcMasterChef.initialize('0xc82e3db60a52cf7529253b4ec688f631aad9e7c2', '0x8e94bc5a1a005f3b8c3e5fde11f5a0356ed8d54d', '0x249dbd179ca17f7dab5055f52f887361e6a2a614', '0xd0e865', '0x75e44d7dd6f18000');
  });
  it('initialize', async function () {
    const arc = await arcMasterChef.arc();
    expect((arc).toString().toLowerCase()).to.equal('0xc82e3db60a52cf7529253b4ec688f631aad9e7c2');
    const feeAddress = await arcMasterChef.feeAddress();
    expect((feeAddress).toString().toLowerCase()).to.equal('0x8e94bc5a1a005f3b8c3e5fde11f5a0356ed8d54d');
    const rewardHolder = await arcMasterChef.rewardHolder();
    expect((rewardHolder).toString().toLowerCase()).to.equal('0x249dbd179ca17f7dab5055f52f887361e6a2a614');
  });

  // add(uint256 _allocPoint, address _lpToken, uint16 _depositFeeBP, uint256 _minDeposit, bool _withUpdate)
  it('add', async function () {
    await arcMasterChef.add('0x7d', '0xae8b9d75a75a8b7c5cc5deb51fa916ac49147dad', '0x1e', '0x0', '0x1'); // UniswapV2Pair
    const poolLength = await arcMasterChef.poolLength();
    expect(poolLength.toNumber()).to.equal(1);
    const poolInfo = await arcMasterChef.poolInfo(0);
    expect(poolInfo.allocPoint.toNumber()).to.equal(0x7d);
    expect(poolInfo.lpToken.toLowerCase()).to.equal('0xae8b9d75a75a8b7c5cc5deb51fa916ac49147dad');
    expect(poolInfo.depositFeeBP).to.equal(0x1e);
  });
  it('add', async function () {
    await arcMasterChef.add('0x4b', '0xc82e3db60a52cf7529253b4ec688f631aad9e7c2', '0x2d', '0x0', '0x1'); // ArcToken //Arc Token (ARC)
    const poolLength = await arcMasterChef.poolLength();
    expect(poolLength.toNumber()).to.equal(2);
    const poolInfo = await arcMasterChef.poolInfo(1);
    expect(poolInfo.allocPoint.toNumber()).to.equal(0x4b);
    expect(poolInfo.lpToken.toLowerCase()).to.equal('0xc82e3db60a52cf7529253b4ec688f631aad9e7c2');
    expect(poolInfo.depositFeeBP).to.equal(0x2d);
  });
});
