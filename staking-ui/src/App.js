import React from 'react'
import { Account } from './components/Account/Account'
import {
  getEthAccounts,
  loopringContract,
  userStakingPoolContract,
  initWeb3,
  initTruffle,
} from './services/Ethereum'

import styles from './App.module.scss'

function App() {
  const [accounts, setAccounts] = React.useState([])
  const [selectedAccount, setSelectedAccount] = React.useState()

  React.useEffect(() => {
    if (accounts.length === 0) {
      getEthAccounts().then((_accounts) => {
        setAccounts(_accounts)
        if (_accounts.length > 0) {
          setSelectedAccount(_accounts[0])
        }
      })
    }
  }, [accounts])

  const connect = (e) => {
    initWeb3()
    e.preventDefault()
  }

  const connectLocal = (e) => {
    initTruffle().then(() => {
      initWeb3()
    })
  }

  const accountSelected = (e) => {
    setSelectedAccount(e.target.value)
  }

  return (
    <div className={styles.App}>
      <div>
        <h2>Contract addresses</h2>
        <button onClick={connect}>Connect</button>
        <button onClick={connectLocal}>Test Connect Local</button>
        <div>Loopring token contract: {loopringContract?._address}</div>
        <div>
          Loopring User Staking Pool contract:&nbsp;
          {userStakingPoolContract?._address}
        </div>
        <h2>Accounts</h2>
        <select onChange={accountSelected}>
          {accounts.map((account) => (
            <option key={account} value={account}>
              {account}
            </option>
          ))}
        </select>
        {selectedAccount && (
          <Account key={selectedAccount} address={selectedAccount} />
        )}
      </div>
    </div>
  )
}

export default App
