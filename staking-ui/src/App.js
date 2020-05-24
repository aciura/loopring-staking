import React from 'react'
import { Account } from './components/Account/Account'
import {
  loopringContract,
  userStakingPoolContract,
  protocolFeeVaultContract,
  initWeb3,
  initTruffle,
} from './services/Ethereum'
import { LinkToEtherscan } from './components/utils'
import { Connect } from './Connect'

import styles from './App.module.scss'

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

        <LinkToEtherscan
          label={'Loopring token contract:'}
          address={loopringContract?._address}
        ></LinkToEtherscan>
        <LinkToEtherscan
          label={'Loopring User Staking Pool contract:'}
          address={userStakingPoolContract?._address}
        ></LinkToEtherscan>
        <LinkToEtherscan
          label={'Protocol Fee Vault Contract:'}
          address={protocolFeeVaultContract?._address}
        ></LinkToEtherscan>
      </section>
    </main>
  )
}

export default App
