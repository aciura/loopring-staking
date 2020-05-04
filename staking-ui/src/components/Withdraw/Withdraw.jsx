import React from 'react'
import LrcService from '../../services/LrcService'
import { TokenAmount, convertLrcToWei } from '../utils'

import styles from './withdraw.module.scss'

export function Withdraw({
  address,
  stakingData,
  refreshAccountInfo = (_) => {},
}) {
  const [error, setError] = React.useState()
  const [amount, setAmount] = React.useState()
  const { balance, withdrawalWaitTime } = stakingData ?? {
    balance: 0,
    withdrawalWaitTime: 0,
  }

  const withdraw = () => {
    if (amount > 0) {
      const amountInWei = convertLrcToWei(amount)
      LrcService.withdraw(address, amountInWei)
        .then(() => {
          refreshAccountInfo()
        })
        .catch((error) => {
          console.error(error)
          setError(`Withdraw of ${amount} has failed`)
        })
    } else setError('Amount has to be larger then zero')
  }

  const updateAmount = (e) => {
    const newValue = +e.target.value

    if (newValue >= 0) {
      setAmount(newValue)
    }
  }

  return (
    <div className={styles.withdraw}>
      Withdraw Staked amount: <TokenAmount amountInWei={balance} symbol="LRC" />
      <input type="number" value={amount} onChange={updateAmount} />
      <button onClick={withdraw}>Withdraw</button>
      {error && <div className={styles.error}>{error?.toString()}</div>}
    </div>
  )
}
