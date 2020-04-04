import React from 'react'
import { Account } from './components/Account/Account'
import { web3, loopringContract, userStakingPoolContract } from './LrcContract'

import styles from './App.module.scss'

function App() {
  const [accounts, setAccounts] = React.useState([])

  React.useEffect(() => {
    if (accounts.length === 0) {
      web3.eth.getAccounts().then(_accounts => {
        setAccounts(_accounts)
      })
    }
  }, [accounts])

  return (
    <div className={styles.App}>
      <div>
        <h2>Contract addresses</h2>
        <div>Loopring token contract: {loopringContract._address}</div>
        <div>
          Loopring User Staking Pool contract:&nbsp;
          {userStakingPoolContract._address}
        </div>
        <h2>Accounts</h2>
        {accounts.map(account => (
          <Account key={account} address={account} />
        ))}
      </div>
    </div>
  )
}

export default App
