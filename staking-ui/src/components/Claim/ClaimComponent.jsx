import React from 'react'
import LrcService from '../../services/LrcService'
import { getWaitTimeInDays, getClaimingDate } from '../utils'
import { TokenAmount } from '../TokenAmount'
import styles from './ClaimComponent.module.scss'

export function ClaimComponent({
  address,
  stakingData,
  refreshAccountInfo = (_) => {},
}) {
  const [error, setError] = React.useState(null)
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
        setError(null)
      })
      .catch((error) => {
        console.error(error)
        setError(error)
      })
  }

  const canClaimReward = rewardWaitTime <= 0
  return (
    <div className={styles.claim}>
      <h4>Claim reward</h4>

      <div>
        All users staked tokens:{' '}
        <TokenAmount amountInWei={totalStaking} symbol="LRC" />
      </div>

      <div>
        Total fee prize: <TokenAmount amountInWei={totalPrize} symbol="LRC" />
      </div>

      <div>
        Your pending reward:&nbsp;
        <TokenAmount amountInWei={pendingReward} symbol="LRC" />
      </div>

      <div>
        Wait time before claiming reward: &nbsp;
        {getWaitTimeInDays(rewardWaitTime)} &nbsp;
        {rewardWaitTime && <span>({getClaimingDate(rewardWaitTime)})</span>}
      </div>

      <button onClick={claimReward} disabled={!canClaimReward}>
        Claim reward
      </button>

      {error && <div className={styles.error}>Claim reward has failed</div>}
    </div>
  )
}
