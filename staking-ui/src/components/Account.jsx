import React from "react";
import LrcService from "../services/LrcService";
import { StakingComponent } from "./StakingComponent";

export function Account({ address }) {
  const [balance, setBalance] = React.useState(null);
  const [allowance, setAllowance] = React.useState(null);
  const [newAllowance, setNewAllowance] = React.useState(0);

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
    LrcService.getLrcAllowances([address])
      .then(allowances => {
        console.log("allowances", allowances);
        setAllowance(Object.values(allowances[0])[0]);
      })
      .catch(error => {
        console.error("getLrcAllowances", error);
      });
  }, [address]);

  const updateAllowance = e => {
    const newValue = e.target.value;
    console.log("changeAllowance", newValue);
    if (newValue >= 0) setNewAllowance(newValue);
  };

  const submitNewAllowance = () => {
    console.log("submitNewAllowance", newAllowance);

    LrcService.setLrcAllowance(
      address,

      newAllowance
    )
      .then(result => {
        console.log("submitNewAllowance", result);
      })
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h3>Address: {address}</h3>
      <div>balance: {balance}</div>
      <div>allowance: {allowance}</div>
      Allow spending:{" "}
      <input type="number" value={newAllowance} onChange={updateAllowance} />
      <input type="submit" value="Approve" onClick={submitNewAllowance} />
      <StakingComponent
        address={address}
        allowance={allowance}
        balance={balance}
      />
    </div>
  );
}
