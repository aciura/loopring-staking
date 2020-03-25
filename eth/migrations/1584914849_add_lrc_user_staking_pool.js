const UserStakingPool = artifacts.require("UserStakingPool");
const LRC_v2 = artifacts.require("LRC_v2");

module.exports = function(_deployer) {
  _deployer.deploy(UserStakingPool, LRC_v2.address);
};
