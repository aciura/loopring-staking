const Loopring_LRC_v2 = artifacts.require("LRC_v2");

module.exports = function(_deployer) {
  _deployer.deploy(Loopring_LRC_v2);
};
