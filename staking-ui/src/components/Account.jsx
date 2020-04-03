import React from 'react'
import LrcService from '../services/LrcService'
import { StakingComponent } from './StakingComponent'
import styles from './Account.module.scss'

export function Account({ address }) {
  const [balance, setBalance] = React.useState(null)
  const [allowance, setAllowance] = React.useState(null)
  const [newAllowance, setNewAllowance] = React.useState(0)

  const refreshAccountInfo = address => {
    LrcService.getLrcBalances([address])
      .then(balances => {
        setBalance(balances[0]?.balance)
      })
      .catch(error => {
        console.error('getLrcBalances', error)
      })
    LrcService.getLrcAllowances([address])
      .then(allowances => {
        console.log('allowances', allowances)
        setAllowance(Object.values(allowances[0])[0])
      })
      .catch(error => {
        console.error('getLrcAllowances', error)
      })
  }

  React.useEffect(() => {
    refreshAccountInfo(address)
  }, [address, refreshAccountInfo])

  const updateAllowance = e => {
    const newValue = e.target.value

    console.log('changeAllowance', newValue)
    if (newValue >= 0) {
      setNewAllowance(newValue)
      refreshAccountInfo(address)
    }
  }

  const submitNewAllowance = () => {
    console.log('submitNewAllowance', newAllowance)

    LrcService.setLrcAllowance(address, newAllowance)
      .then(result => {
        console.log('submitNewAllowance', result)
        refreshAccountInfo(address)
      })
      .catch(error => console.error(error))
  }

  return (
    <div className={styles.Account}>
      <h3>Address: {address}</h3>
      <div>balance: {balance}</div>
      <div>allowance: {allowance}</div>
      Allow spending:&nbsp;
      <input type="number" value={newAllowance} onChange={updateAllowance} />
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
