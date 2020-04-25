const Loopring_LRC_v2 = artifacts.require("LRC_v2");
const UserStakingPool = artifacts.require("UserStakingPool");
const ProtocolFeeVault = artifacts.require("ProtocolFeeVault");

module.exports = function (_deployer) {
  _deployer.deploy(Loopring_LRC_v2);

  _deployer.link(Loopring_LRC_v2, UserStakingPool);
  _deployer.deploy(UserStakingPool, Loopring_LRC_v2.address);

  _deployer.link(UserStakingPool, ProtocolFeeVault);
  _deployer.link(Loopring_LRC_v2, ProtocolFeeVault);
  _deployer.deploy(ProtocolFeeVault, Loopring_LRC_v2.address);

  console.log("Loopring_LRC_v2.address", Loopring_LRC_v2.address);
};
