import React from 'react'
import LrcService from '../../services/LrcService'
import ChangeAmount from '../ChangeAmount/ChangeAmount'
import { StakingComponent } from '../Staking/StakingComponent'
import { TokenAmount } from '../TokenAmount'
import { ReactComponent as LrcLogo } from '../../assets/LRC_black.svg'
import { LinkToEtherscan } from '../LinkToEtherscan'

import styles from './Account.module.scss'

export function Account({ address }) {
  const [balance, setBalance] = React.useState(null)
  const [allowance, setAllowance] = React.useState(0)
  const [isLoading, setIsLoading] = React.useState(true)

  const refreshAccountInfo = React.useCallback(
    (address) => {
      setIsLoading(true)

      LrcService.getLrcBalance(address)
        .then((balance) => {
          setBalance(balance)
        })
        .catch((error) => {
          console.error('getLrcBalances', error)
        })

      LrcService.getLrcAllowance(address)
        .then((allowanceInWei) => {
          setAllowance(allowanceInWei)
        })
        .catch((error) => {
          console.error('getLrcAllowances', error)
        })
        .finally(() => {
          setIsLoading(false)
        })
    },
    [address],
  )

  const submitNewAllowance = (newAllowance) => {
    console.log('submitNewAllowance', newAllowance)

    LrcService.setLrcAllowance(address, newAllowance)
      .then((result) => {
        console.log('submitNewAllowance', result)
        refreshAccountInfo(address)
      })
      .catch((error) => console.error(error))
  }

  React.useEffect(() => {
    refreshAccountInfo(address)
  }, [address, refreshAccountInfo])

  return (
    <div className={styles.Account}>
      <header>
        <LrcLogo />
        <h2>Loopring Staking</h2>
      </header>
      {/* <h4> */}
      {/* <span>Address:&nbsp;</span> */}
      <LinkToEtherscan label={'Address:'} address={address}></LinkToEtherscan>
      {/* </h4> */}
      {/* {isLoading && <div>Loading...</div>} */}
      <div>
        Account balance: <TokenAmount amountInWei={balance} symbol="LRC" />
      </div>
      <button onClick={() => refreshAccountInfo(address)}>Refresh</button>
      <div>
        Current allowance: <TokenAmount amountInWei={allowance} symbol="LRC" />{' '}
      </div>
      <ChangeAmount
        text={'New allowance:'}
        max={balance}
        amount={allowance}
        submitAmountChange={submitNewAllowance}
      />
      <StakingComponent
        address={address}
        allowance={allowance}
        balance={balance}
        refreshAccountInfo={refreshAccountInfo}
      />
    </div>
  )
}
