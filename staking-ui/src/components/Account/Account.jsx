import React from 'react'
import LrcService from '../../services/LrcService'
import { StakingComponent } from '../Staking/StakingComponent'
import { TokenAmount, convertLrcToWei, displayWei } from '../utils'
import Web3 from 'web3'
import InputSlider from '../InputSlider/InputSlider'

import styles from './Account.module.scss'

export function Account({ address }) {
  const [balance, setBalance] = React.useState(null)
  const [allowance, setAllowance] = React.useState(null)
  const [newAllowance, setNewAllowance] = React.useState(0)

  const refreshAccountInfo = React.useCallback(
    (address) => {
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
    },
    [address],
  )

  React.useEffect(() => {
    refreshAccountInfo(address)
  }, [address, refreshAccountInfo])

  const submitNewAllowance = () => {
    console.log('submitNewAllowance', newAllowance)

    LrcService.setLrcAllowance(address, newAllowance)
      .then((result) => {
        console.log('submitNewAllowance', result)
        refreshAccountInfo(address)
      })
      .catch((error) => console.error(error))
  }

  const updateAllowance = (newValue) => {
    console.log('changeAllowance', newValue)
    if (newValue >= 0) {
      setNewAllowance(newValue)
    }
  }

  const allowanceInputChange = (newLrcValue) => {
    console.log('allowanceInputChange', { newLrcValue })
    if (+newLrcValue >= 0) {
      updateAllowance(convertLrcToWei(newLrcValue))
    }
  }

  const sliderChange = (sliderValue) => {
    console.log('sliderChange', { balance, sliderValue })
    let allowanceBn = new Web3.utils.BN(balance)
    allowanceBn = allowanceBn.muln(+sliderValue)
    console.log(allowanceBn.toString())
    allowanceBn = allowanceBn.divn(100)
    console.log(allowanceBn.toString())

    updateAllowance(allowanceBn)
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
        type="text"
        value={displayWei(newAllowance)}
        onChange={(e) => allowanceInputChange(e.target.value)}
      />
      <InputSlider
        onChange={sliderChange}
        initialPercent={(allowance / balance) * 100}
      />
      <input type="submit" value="Approve" onClick={submitNewAllowance} />
      {/* <StakingComponent
        address={address}
        allowance={allowance}
        balance={balance}
        refreshAccountInfo={refreshAccountInfo}
      /> */}
    </div>
  )
}
