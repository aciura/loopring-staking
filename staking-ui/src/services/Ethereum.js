import Web3 from 'web3'
import LrcContract from '../contracts/LRC_v2.json'
import UserStakingPool from '../contracts/UserStakingPool.json'
import ProtocolFeeVault from '../contracts/ProtocolFeeVault.json'

let web3 = null
const getWeb3 = async () => {
  if (web3) return web3

  if (window.ethereum) {
    web3 = new Web3(window.ethereum)
    try {
      // Request account access if needed
      await window.ethereum.enable()
      // Acccounts now exposed
      return web3
    } catch (error) {
      console.error(error)
    }
  }
  // Legacy dapp browsers...
  else if (window.web3) {
    // Use Mist/MetaMask's provider.
    web3 = window.web3
    console.log('Injected web3 detected.')
    return web3
  }
}

export const initTruffle = async () => {
  const localNode = 'http://127.0.0.1:9545/' //Truffle develop
  // const localNode = 'http://127.0.0.1:7545' //GANASHE node
  console.log(`No web3 instance injected, using ${localNode} web3.`)
  web3 = new Web3(localNode)
}

const lrcNetworkDeploymentKey = 'prod'
export let loopringContract = null

const uspNetworkDeploymentKey = 'prod'
export let userStakingPoolContract = null

const ProtocolFeeVaultDeploymentKey = 'prod'
export let protocolFeeVaultContract = null

export const initWeb3 = async () => {
  return getWeb3().then((web3) => {
    loopringContract = new web3.eth.Contract(
      LrcContract.abi,
      LrcContract.networks[lrcNetworkDeploymentKey].address,
    )

    userStakingPoolContract = new web3.eth.Contract(
      UserStakingPool.abi,
      UserStakingPool.networks[uspNetworkDeploymentKey].address,
    )

    protocolFeeVaultContract = new web3.eth.Contract(
      ProtocolFeeVault.abi,
      ProtocolFeeVault.networks[ProtocolFeeVaultDeploymentKey].address,
    )

    return web3
  })
}

export const getEthAccounts = async () => {
  if (web3) return web3.eth.getAccounts()
  else return []
}
