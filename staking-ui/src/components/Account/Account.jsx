import React from 'react'
import LrcService from '../../services/LrcService'
import { StakingComponent } from '../Staking/StakingComponent'
import { TokenAmount, convertLrcToWei } from '../utils'
import InputSlider from '../InputSlider/InputSlider'

import styles from './Account.module.scss'

export function Account({ address }) {
  const [balance, setBalance] = React.useState(null)
  const [allowance, setAllowance] = React.useState(null)
  const [newAllowance, setNewAllowance] = React.useState(0)

  const refreshAccountInfo = React.useCallback(
    (address) => {
      LrcService.getLrcBalances([address])
        .then((balances) => {
          setBalance(balances[0]?.balance)
        })
        .catch((error) => {
          console.error('getLrcBalances', error)
        })
      LrcService.getLrcAllowances([address])
        .then((allowances) => {
          // console.log('allowances', allowances)
          setAllowance(Object.values(allowances[0])[0])
        })
        .catch((error) => {
          console.error('getLrcAllowances', error)
        })
    },
    [address],
  )

  React.useEffect(() => {
    refreshAccountInfo(address)
  }, [address, refreshAccountInfo])

  const updateAllowance = (newValue) => {
    console.log('changeAllowance', newValue)
    if (newValue >= 0) {
      setNewAllowance(newValue)
      refreshAccountInfo(address)
    }
  }

  const submitNewAllowance = () => {
    console.log('submitNewAllowance', newAllowance)
    const newAllowanceInWei = convertLrcToWei(newAllowance)

    LrcService.setLrcAllowance(address, newAllowanceInWei)
      .then((result) => {
        console.log('submitNewAllowance', result)
        refreshAccountInfo(address)
      })
      .catch((error) => console.error(error))
  }

  const sliderChange = (sliderValue) => {
    console.log({ sliderValue })
    updateAllowance((balance * sliderValue) / 100)
  }

  return (
    <div className={styles.Account}>
      <h3>Address: {address}</h3>
      <div>
        balance: <TokenAmount amountInWei={balance} symbol="LRC" />
      </div>
      <div>
        allowance: <TokenAmount amountInWei={allowance} symbol="LRC" />{' '}
      </div>
      Allow spending:&nbsp;
      <input
        type="number"
        value={newAllowance}
        onChange={(e) => updateAllowance(e.target.value)}
      />
      <InputSlider onChange={sliderChange} />
      <input type="submit" value="Approve" onClick={submitNewAllowance} />
      <StakingComponent
        address={address}
        allowance={allowance}
        balance={balance}
        refreshAccountInfo={refreshAccountInfo}
      />
    </div>
  )
}
