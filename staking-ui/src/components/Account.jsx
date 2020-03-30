import React from "react";
import LrcService from "../services/LrcService";
import {
  web3,
  loopringContract,
  userStakingPoolContract
} from "../LrcContract";

export function Account({ address }) {
  const [balance, setBalance] = React.useState(null);
  const [allowance, setAllowance] = React.useState(null);

  React.useEffect(() => {
    LrcService.getLrcBalances([address])
      .then(balances => {
        setBalance(balances[0]?.balance);
      })
      .catch(error => {
        console.error("getLrcBalances", error);
      });
  }, [address]);

  React.useEffect(() => {
    LrcService.getLrcAllowances([address], userStakingPoolContract._address)
      .then(allowances => {
        console.log("allowances", allowances);
        setAllowance(Object.values(allowances[0])[0]);
      })
      .catch(error => {
        console.error("getLrcAllowances", error);
      });
  }, [address, userStakingPoolContract]);

  return (
    <div>
      <h3>Address: {address}</h3>
      <div>balance: {balance}</div>
      <div>allowance: {allowance}</div>
      Allow spending: <input type="number"></input>
      <input type="submit" value="Approve" />
      <div>Staking amount</div>
    </div>
  );
}
