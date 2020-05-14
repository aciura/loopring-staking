import React from 'react'
import LrcService from '../../services/LrcService'
import { ClaimComponent } from '../Claim/ClaimComponent'
import { Withdraw } from '../Withdraw/Withdraw'
import { TokenAmount, convertLrcToWei, weiMin, displayWei } from '../utils'
import InputSlider from '../InputSlider/InputSlider'
import Web3 from 'web3'

import styles from './staking.module.scss'

// const userStaking = {
//   withdrawalWaitTime: 0 /*uint256 the time you need to wait (seconds) before you can withdraw staked LRC */,
//   rewardWaitTime: 0 /*uint256* - the time you need to wait (seconds) before you can claim LRC reward */,
//   balance: 0 /*uint256*/,
//   pendingReward: 0 /*uint256*/,
// }

export function StakingComponent({
  address,
  allowance,
  balance,
  refreshAccountInfo = (_) => {},
}) {
  const [newStakeAmount, setNewStakeAmount] = React.useState(0)
  const [stakingData, setStakingData] = React.useState(null)
  const [error, setError] = React.useState(null)
  const maxStakeAmount = weiMin(allowance, balance)

  console.log('StakingComponent', {
    allowance,
    balance,
    maxStakeAmount,
    stakingData,
  })

  const refreshAddressStaking = (address) => {
    LrcService.getUserStaking(address).then((result) => {
      console.log('getUserStaking result:', result)
      setStakingData(result)
    })
    refreshAccountInfo(address)
  }

  const updateStakeAmount = (newStakeAmount) => {
    if (newStakeAmount > 0) setNewStakeAmount(newStakeAmount)
  }

  const stakeLrc = () => {
    // const newStakeAmountInWei = convertLrcToWei(newStakeAmount)

    LrcService.stake(address, newStakeAmount)
      .then((result) => {
        console.log(result)
        refreshAddressStaking(address)
      })
      .catch((error) => {
        console.error(error)
        setError(error.toString())
      })
  }

  React.useEffect(() => {
    refreshAddressStaking(address)
  }, [address])

  const getWaitTimeInDays = (waitTimeInSec) => {
    return (waitTimeInSec / 60 / 60 / 24).toFixed(2)
  }

  const sliderChange = (sliderValue) => {
    console.log('sliderChange', { maxStakeAmount, sliderValue })
    let newStakeAmount = new Web3.utils.BN(maxStakeAmount)
    newStakeAmount = maxStakeAmount.muln(+sliderValue)
    newStakeAmount = newStakeAmount.divn(100)
    console.log(newStakeAmount.toString())

    updateStakeAmount(newStakeAmount)
  }

  return (
    <div className={styles.staking}>
      <h4>Staking amount</h4>
      <div>
        Stake balance:{' '}
        <TokenAmount amountInWei={stakingData?.balance} symbol="LRC" />{' '}
      </div>
      <div>
        Stake max:{' '}
        <TokenAmount
          amountInWei={+allowance ? maxStakeAmount : 0}
          symbol="LRC"
        />
      </div>
      <div>
        Withdrawal Wait Time:&nbsp;
        {getWaitTimeInDays(stakingData?.withdrawalWaitTime)}
        days
      </div>
      <div>
        Wait time before claiming reward:&nbsp;
        {getWaitTimeInDays(stakingData?.rewardWaitTime)} days
      </div>

      <input
        type="number"
        value={displayWei(newStakeAmount)}
        onChange={(e) => updateStakeAmount(e.target.value)}
      />
      <InputSlider onChange={sliderChange} />

      <input type="submit" value="Stake" onClick={stakeLrc} />
      {!!error && <div style={{ color: 'red' }}>Staking LRC has failed</div>}

      {/* <ClaimComponent
        stakingData={stakingData}
        address={address}
        refreshAccountInfo={refreshAccountInfo}
      />

      <Withdraw
        stakingData={stakingData}
        address={address}
        refreshAccountInfo={refreshAccountInfo}
      /> */}
    </div>
  )
}
