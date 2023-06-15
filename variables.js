module.exports = {
    address: {
        arc: '0xC82E3dB60A52CF7529253b4eC688f631aad9e7c2', // arc token
        uniswap: '0x47082A75BC16313EF92cfACa1FEb885659c3c9B5', // eth-arc lp token
        feeAddress: '0x8e94bc5a1a005f3b8c3e5fde11f5a0356ed8d54d', //holders wallet
        // rewardHolder: '0x249dbd179ca17f7dab5055f52f887361e6a2a614', // only this one needs to be changed!!
        rewardHolder: '0xCe33279DA3bFC59F74db3D9d22f6e056ee6cC47c', // and change it after Tj
    },
    others: {
        startBlock: 14159770,
        arcPerBlock:  '17000000000000000000' // <== '8495000000000000000' * 2
    },
    uniswapAddParams: {
        allocPoint: 125,
        depositFeeBP: 0,
        minDeposit: 0
    },
    arcAddParams: {
        allocPoint: 75,
        depositFeeBP: 0,
        minDeposit: 0
    },
    deposit: {
        uniswap: '100000000000000000',
        arc: '10000000000000000000'
    }
};
