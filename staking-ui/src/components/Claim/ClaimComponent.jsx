import React from 'react'
import LrcService from '../../services/LrcService'
import { TokenAmount, getWaitTimeInDays } from '../utils'
import styles from './ClaimComponent.module.scss'

export function ClaimComponent({
  address,
  stakingData,
  refreshAccountInfo = (_) => {},
}) {
  const [error, setError] = React.useState()
  const [totalStaking, setTotalStaking] = React.useState('')
  const [totalPrize, setTotalPrize] = React.useState(0)

  const { pendingReward, rewardWaitTime } = stakingData ?? {
    pendingReward: '0',
    rewardWaitTime: 0,
  }

  React.useEffect(() => {
    LrcService.getTotalStaking().then((result) => {
      setTotalStaking(result)
    })
    LrcService.getProtocolFeeVaultValue().then((feeAmount) => {
      setTotalPrize(feeAmount)
    })
  }, [stakingData])

  const claimReward = () => {
    LrcService.claimReward(address)
      .then((result) => {
        console.log('claimReward result', result)
        refreshAccountInfo()
      })
      .catch((error) => {
        console.error(error)
        setError(error)
      })
  }

  return (
    <div className={styles.claim}>
      All users staking sum:{' '}
      <TokenAmount amountInWei={totalStaking} symbol="LRC" />
      <br />
      Total fee prize: <TokenAmount amountInWei={totalPrize} symbol="LRC" />
      <br />
      Your pending Reward:&nbsp;
      <TokenAmount amountInWei={pendingReward} symbol="LRC" />
      <div>
        Wait time before claiming reward:&nbsp;
        {getWaitTimeInDays(rewardWaitTime)}
      </div>
      <button onClick={claimReward}>Claim Reward</button>
      {error && <div className={styles.error}>Claim reward has failed</div>}
    </div>
  )
}
