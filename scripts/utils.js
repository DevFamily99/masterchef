const { BigNumber } = require("ethers");

const _toBN = (value, decimals=18) => {
  const multiplier = (BigNumber.from(10)).pow(decimals);
  if (value < 1) {
    return multiplier.div((1/value).toFixed(0));
  } else if (Math.floor(value) === value) {
      return (BigNumber.from(value)).mul(multiplier);
  }
  const int = Math.floor(value);
  const frac = value - int;
  return (BigNumber.from(int)).mul(multiplier).add(toBN(frac, decimals));
}

const toBN = (value, decimals=18) => {
  return _toBN(value, decimals).toString();
}

module.exports = {
    _toBN,
    toBN
}