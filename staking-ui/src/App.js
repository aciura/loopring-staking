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

function Connect({ onConnected, setAccounts }) {
  const connect = (e) => {
    initWeb3().then((web3) => {
      e.preventDefault()
      onConnected()
      getEthAccounts()
        .then((_accounts) => {
          setAccounts(_accounts)
        })
        .catch((error) => {
          console.error(error)
        })
    })
  }

  return (
    <div className={styles.connectContainer}>
      <h4>Loopring Staking</h4>
      <button className={styles.connectButton} onClick={connect}>
        Connect
      </button>
    </div>
  )
}

function App() {
  const [accounts, setAccounts] = React.useState([])
  const [selectedAccount, setSelectedAccount] = React.useState()
  const [connected, setConnected] = React.useState(false)

  const onConnected = () => {
    setConnected(true)
  }

  React.useEffect(() => {
    if (accounts.length > 0) {
      setSelectedAccount(accounts[0])
    }
  }, [accounts])

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
      <section className={styles.container}>
        {!connected && (
          <>
            <Connect setAccounts={setAccounts} onConnected={onConnected} />
            <button className={styles.testBtn} onClick={connectLocal}>
              Test Connect Local
            </button>
          </>
        )}

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

        <div>Loopring token contract: {loopringContract?._address}</div>
        <div>
          Loopring User Staking Pool contract:&nbsp;
          {userStakingPoolContract?._address}
        </div>
        <div>
          Protocol Fee Vault Contract: {protocolFeeVaultContract?._address}
        </div>
      </section>
    </main>
  )
}

export default App
