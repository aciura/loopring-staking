import Web3 from 'web3'
import LrcContract from './contracts/LRC_v2.json'
import UserStakingPool from './contracts/UserStakingPool.json'

// const truffleNode = "http://127.0.0.1:9545/"; //Truffle develop
const truffleNode = 'http://127.0.0.1:7545' //GANASHE node

export const web3 = new Web3(truffleNode)

const lrcNetworkDeploymentKey = Object.keys(LrcContract.networks)[0]
export const loopringContract = new web3.eth.Contract(
  LrcContract.abi,
  LrcContract.networks[lrcNetworkDeploymentKey].address,
)

const uspNetworkDeploymentKey = Object.keys(UserStakingPool.networks)[0]
export const userStakingPoolContract = new web3.eth.Contract(
  UserStakingPool.abi,
  UserStakingPool.networks[uspNetworkDeploymentKey].address,
)
