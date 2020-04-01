import { loopringContract, userStakingPoolContract } from "../LrcContract";

const getLrcBalances = accounts => {
  console.log("getLrcBalances", accounts);

  const balances = accounts.map(acc =>
    loopringContract.methods
      .balanceOf(acc)
      .call()
      .then(balance => {
        console.log(`Acc ${acc} balance:`, balance);
        return { address: acc, balance };
      })
  );

  console.log("balances", balances);

  return Promise.all(balances)
    .then(resolved => {
      console.log("Promise.all resolved", resolved);
      return resolved;
    })
    .catch(error => {
      console.error(error);
      return [];
    });
};

const getLrcAllowances = accounts => {
  const spenderAddress = userStakingPoolContract._address;
  console.log("getLrcAllowances", accounts, spenderAddress);

  const allowances = accounts.map(address =>
    loopringContract.methods
      .allowance(address, spenderAddress)
      .call()
      .then(allowance => ({ [address]: allowance }))
  );
  console.log(allowances);

  return Promise.all(allowances);
};

const setLrcAllowance = (address, lrcAmountInWei) => {
  const spenderAddress = userStakingPoolContract._address;
  console.log("setLrcAllowance", address, spenderAddress, lrcAmountInWei);

  return loopringContract.methods
    .approve(spenderAddress, lrcAmountInWei)
    .send({ from: address })
    .then(result => result);
};

const stake = (address, lrcAmountInWei) => {
  console.log("stake", address, lrcAmountInWei);

  return userStakingPoolContract.methods
    .stake(lrcAmountInWei)
    .send({ from: address, gasLimit: 200000 });
};

const getUserStaking = address => {
  console.log("getUserStaking", address);

  return userStakingPoolContract.methods.getUserStaking(address).call();
};

const LrcService = {
  getLrcBalances,
  getLrcAllowances,
  setLrcAllowance,
  stake,
  getUserStaking
};
export default LrcService;
