import React from 'react'
import LrcService from '../../services/LrcService'
import {
  convertLrcToWei,
  getWaitTimeInDays,
  getClaimingDate,
  displayWei,
} from '../utils'
import { TokenAmount } from '../TokenAmount'
import ChangeAmount from '../ChangeAmount/ChangeAmount'

import styles from './withdraw.module.scss'

export function Withdraw({
  address,
  stakingData,
  refreshAccountInfo = (_) => {},
}) {
  const [error, setError] = React.useState()
  const [amount, setAmount] = React.useState(0)
  const { balance, withdrawalWaitTime } = stakingData ?? {
    balance: 0,
    withdrawalWaitTime: 0,
  }

  const withdraw = (amount) => {
    if (amount > 0) {
      const amountInWei = convertLrcToWei(amount)
      LrcService.withdraw(address, amountInWei)
        .then(() => {
          setAmount(0)
          refreshAccountInfo()
          setError(null)
        })
        .catch((error) => {
          console.error(error)
          setError(`Withdraw of ${displayWei(amount)} has failed`)
        })
    } else setError('Amount has to be larger then zero')
  }

  const canWithdraw = withdrawalWaitTime <= 0

  return (
    <div className={styles.withdraw}>
      <div>
        Withdrawal wait time:&nbsp;
        {getWaitTimeInDays(withdrawalWaitTime)}
        &nbsp; ({getClaimingDate(withdrawalWaitTime)})
      </div>

      <div>
        Withdraw staked amount:{' '}
        <TokenAmount amountInWei={balance} symbol="LRC" />
      </div>

      <ChangeAmount
        text={'Withdraw amount:'}
        max={canWithdraw ? balance : 0}
        amount={amount}
        submitAmountChange={withdraw}
      />

      {error && <div className={styles.error}>{error?.toString()}</div>}
    </div>
  )
}
