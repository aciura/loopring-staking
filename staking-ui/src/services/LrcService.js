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

const LrcService = {
  getLrcBalances
};
export default LrcService;
