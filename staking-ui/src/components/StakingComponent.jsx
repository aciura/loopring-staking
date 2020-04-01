import React from "react";
import LrcService from "../services/LrcService";

export function StakingComponent({ address, allowance, balance }) {
  const [newStakeAmount, setNewStakeAmount] = React.useState(0);
  const [stakingData, setStakingData] = React.useState(null);

  const updateAmount = e => {
    const newAmount = e.target.value;
    if (newAmount > 0) setNewStakeAmount(newAmount);
  };

  const stakeLrc = () => {
    LrcService.stake(address, newStakeAmount)
      .then(result => {
        console.log(result);
      })
      .catch(error => console.error(error));
  };

  React.useEffect(() => {
    /* (
      uint256 withdrawalWaitTime,
      uint256 rewardWaitTime,
      uint256 balance,
      uint256 pendingReward
      )
    */
    LrcService.getUserStaking(address).then(result => {
      console.log(result);
      setStakingData(result);
    });
  }, [address]);

  return (
    <div>
      <h4>Staking amount</h4>
      <div>Stake balance: {stakingData?.balance}</div>
      <div>Stake pending reward: {stakingData?.pendingReward}</div>
      <div>Stake max: {Math.min(allowance, balance)}</div>
      <input type="number" value={newStakeAmount} onChange={updateAmount} />
      <input type="submit" value="Stake" onClick={stakeLrc} />
    </div>
  );
}
