import React from 'react'
import { getEthAccounts, initWeb3 } from '../../services/Ethereum'
import { ReactComponent as LrcLogo } from '../../assets/LRC_black.svg'

import styles from './Connect.module.scss'

export function Connect({ onConnected, setAccounts }) {
  const connect = (e) => {
    e.preventDefault()

    initWeb3().then((web3) => {
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
    <div className={styles.connect}>
      <header>
        <LrcLogo />
        <h2>Loopring Staking</h2>
      </header>
      <button className={styles.connectButton} onClick={connect}>
        Connect
      </button>
      <div>
        This app needs a MetaMask browser extension to connect to Ethereum
        network
      </div>
    </div>
  )
}
