import React from 'react'
import LrcService from '../../services/LrcService'
import { ClaimComponent } from '../Claim/ClaimComponent'
import { Withdraw } from '../Withdraw/Withdraw'
import { TokenAmount, weiMin } from '../utils'
import ChangeAmount from '../ChangeAmount/ChangeAmount'

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
  const [stakingData, setStakingData] = React.useState(null)
  const [error, setError] = React.useState(null)
  const maxStakeAmount = weiMin(allowance, balance)
  const [newStakeAmount, setNewStakeAmount] = React.useState(0)

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
  }

  const stakeLrc = (newStakeAmount) => {
    console.log('stakeLrc', { newStakeAmount })

    LrcService.stake(address, newStakeAmount)
      .then((result) => {
        console.log('Staked', result)
        setError(null)
        setNewStakeAmount(0)
        refreshAddressStaking(address)
        refreshAccountInfo(address)
      })
      .catch((error) => {
        console.error(error)
        setError(error.toString())
      })
  }

  React.useEffect(() => {
    console.log('StakingComponent useEffect')
    refreshAddressStaking(address)
  }, [address])

  return (
    <div className={styles.staking}>
      <h4>Staking</h4>
      <div>
        Staked balance:{' '}
        <TokenAmount amountInWei={stakingData?.balance} symbol="LRC" />{' '}
      </div>
      <div>
        You can stake:{' '}
        <TokenAmount
          amountInWei={+allowance ? maxStakeAmount : 0}
          symbol="LRC"
        />
      </div>

      <ChangeAmount
        text={'New Stake:'}
        max={maxStakeAmount}
        amount={newStakeAmount}
        submitAmountChange={stakeLrc}
      />

      {!!error && <div className={styles.error}>Staking LRC has failed</div>}

      <ClaimComponent
        stakingData={stakingData}
        address={address}
        refreshAccountInfo={refreshAccountInfo}
      />

      <Withdraw
        stakingData={stakingData}
        address={address}
        refreshAccountInfo={refreshAccountInfo}
      />
    </div>
  )
}
