import { web3, loopringContract } from "../LrcContract";

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

const getLrcAllowances = (accounts, spenderAddress) => {
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

const LrcService = {
  getLrcBalances,
  getLrcAllowances
};
export default LrcService;
