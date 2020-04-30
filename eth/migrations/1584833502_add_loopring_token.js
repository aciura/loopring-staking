const LRC_v2 = artifacts.require("LRC_v2");
const UserStakingPool = artifacts.require("UserStakingPool");
const ProtocolFeeVault = artifacts.require("ProtocolFeeVault");

module.exports = function (deployer) {
  console.log("0 Loopring_LRC_v2.address", LRC_v2.address);

  deployer.deploy(LRC_v2).then(() => {
    deployer.link(LRC_v2, UserStakingPool);

    console.log("1.1 Loopring_LRC_v2.address", LRC_v2.address);
    console.log("1.2 UserStakingPool.address", UserStakingPool.address);
    console.log("1.3 ProtocolFeeVault.address", ProtocolFeeVault.address);

    return deployer.deploy(UserStakingPool, LRC_v2.address).then(() => {
      console.log("2.0 UserStakingPool.address", UserStakingPool.address);

      deployer.link(UserStakingPool, ProtocolFeeVault);
      deployer.link(LRC_v2, ProtocolFeeVault);
      return deployer.deploy(ProtocolFeeVault, LRC_v2.address).then(() => {
        console.log("3.0 ProtocolFeeVault.address", ProtocolFeeVault.address);
      });
    });
  });

  console.log("End Loopring_LRC_v2.address", LRC_v2.address);
};
