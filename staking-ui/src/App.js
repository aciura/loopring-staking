import React from 'react'
import { Account } from './components/Account/Account'
import {
  getEthAccounts,
  loopringContract,
  userStakingPoolContract,
  protocolFeeVaultContract,
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
    <main className={styles.App}>
      <h2>Contract addresses</h2>
      <section className={styles.container}>
        <div className={styles.connectContainer}>
          <h4>Loopring Staking</h4>
          <button className={styles.connectButton} onClick={connect}>
            Connect
          </button>
        </div>
        <button className={styles.testBtn} onClick={connectLocal}>
          Test Connect Local
        </button>
        <div>Loopring token contract: {loopringContract?._address}</div>
        <div>
          Loopring User Staking Pool contract:&nbsp;
          {userStakingPoolContract?._address}
        </div>
        <div>
          Protocol Fee Vault Contract: {protocolFeeVaultContract?._address}
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
      </section>
    </main>
  )
}

export default App
