const Loopring_LRC_v2 = artifacts.require("LRC_v2");
const UserStakingPool = artifacts.require("UserStakingPool");

module.exports = function(_deployer) {
  _deployer.deploy(Loopring_LRC_v2);
  _deployer.link(Loopring_LRC_v2, UserStakingPool);
  _deployer.deploy(UserStakingPool, LRC_v2.address);
};
