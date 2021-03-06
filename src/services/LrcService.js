import Web3 from 'web3'
import {
  loopringContract,
  userStakingPoolContract,
  protocolFeeVaultContract,
} from './Ethereum'

const getLrcBalance = (account) => {
  console.log('getLrcBalance', account)

  return loopringContract.methods
    .balanceOf(account)
    .call()
    .then((balance) => {
      console.log(`Acc ${account} balance:`, balance)
      return Web3.utils.toBN(balance)
    })
    .catch((error) => {
      console.error(error)
      return -1
    })
}

const getLrcAllowance = (account) => {
  const spenderAddress = userStakingPoolContract._address
  console.log('getLrcAllowances', { account, spenderAddress })

  return loopringContract.methods
    .allowance(account, spenderAddress)
    .call()
    .then((allowance) => {
      console.log(`Acc ${account} allowance:`, allowance)
      return Web3.utils.toBN(allowance)
    })
    .catch((error) => {
      console.error(error)
      return -1
    })
}

const setLrcAllowance = (address, lrcAmountInWei) => {
  const spenderAddress = userStakingPoolContract._address
  console.log('setLrcAllowance', { address, spenderAddress, lrcAmountInWei })

  return loopringContract.methods
    .approve(spenderAddress, lrcAmountInWei)
    .send({ from: address })
    .then((result) => result)
}

const stake = (address, lrcAmountInWei) => {
  console.log('stake', { address, lrcAmountInWei })

  return userStakingPoolContract.methods
    .stake(lrcAmountInWei)
    .send({ from: address, gasLimit: 2000000 })
}

const getUserStaking = (address) => {
  console.log('getUserStaking', address)
  return userStakingPoolContract.methods.getUserStaking(address).call()
}

const claimReward = (address) => {
  console.log('claimReward', address)
  return userStakingPoolContract.methods.claim().send({ from: address })
}

const withdraw = (address, lrcAmountInWei) => {
  console.log('withdraw', { address, lrcAmountInWei })
  return userStakingPoolContract.methods
    .withdraw(lrcAmountInWei)
    .send({ from: address })
}

const getTotalStaking = () => {
  console.log('getTotalStaking')

  return userStakingPoolContract.methods.getTotalStaking().call()
}

export const getProtocolFeeVaultValue = () => {
  console.log('getProtocolFeeVaultValue')
  return loopringContract.methods
    .balanceOf(protocolFeeVaultContract._address)
    .call()
    .then((balance) => {
      console.log('protocolFeeVaultContract.address', {
        address: protocolFeeVaultContract._address,
        balance,
      })
      return Web3.utils.toBN(balance)
    })
    .catch((error) => {
      console.error(error)
      return 0
    })
}

const LrcService = {
  getLrcBalance,
  getLrcAllowance,
  setLrcAllowance,
  getUserStaking,
  stake,
  claimReward,
  withdraw,
  getTotalStaking,
  getProtocolFeeVaultValue,
}
export default LrcService
