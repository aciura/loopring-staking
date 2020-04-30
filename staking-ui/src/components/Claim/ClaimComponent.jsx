import React from 'react'
import LrcService from '../../services/LrcService'
import styles from './ClaimComponent.module.scss'

export function ClaimComponent({
  address,
  stakingData,
  refreshAccountInfo = (_) => {},
}) {
  const [error, setError] = React.useState()
  const [totalStaking, setTotalStaking] = React.useState(0)

  const { pendingReward } = stakingData ?? { pendingReward: 0 }

  React.useEffect(() => {
    LrcService.getTotalStaking().then((result) => {
      setTotalStaking(result)
    })
  }, [])

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
      Total staking: {totalStaking}
      <br />
      Pending Reward:&nbsp;{pendingReward}
      <button onClick={claimReward}>Claim Reward</button>
      {error && <div className={styles.error}>Claim reward has failed</div>}
    </div>
  )
}
