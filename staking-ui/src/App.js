import React from "react";
import { Account } from "./components/Account";
import LrcService from "./services/LrcService";
import { web3, loopringContract, userStakingPoolContract } from "./LrcContract";

import "./App.css";

function App() {
  const [accounts, setAccounts] = React.useState([]);
  const [balances, setBalances] = React.useState([]);

  console.log("loopringToken", loopringContract);
  console.log("user staking pool", userStakingPoolContract);

  React.useEffect(() => {
    if (accounts.length === 0) {
      web3.eth.getAccounts().then(result => {
        setAccounts(result);

        LrcService.getLrcBalances(result)
          .then(balances => {
            setBalances(balances);
          })
          .catch(error => {
            console.error(error);
          });
      });
    }
  }, [accounts]);

  return (
    <div className="App">
      <div>
        <h2>Accounts</h2>
        {balances.map(account => (
          <Account
            key={account}
            address={account.address}
            balance={account.balance}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
