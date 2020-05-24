import Web3 from 'web3'

const BN = Web3.utils.BN

function isNumberGEqZero(value) {
  return typeof value == 'number' && value >= 0
}

export function convertLrcToWei(amountInLrc) {
  return Web3.utils.toWei(amountInLrc, 'ether')
}

export function weiMin(a, b) {
  if (a === null || a === undefined) return b
  if (b === null || b === undefined) return a

  const abn = new BN(a)
  const bbn = new BN(b)

  return Web3.utils.BN.min(abn, bbn)
}

export function displayWei(amountInWei) {
  // console.info('displayWei', { type: typeof amountInWei, amountInWei })

  if (Web3.utils.isBN(amountInWei)) {
    return Web3.utils.fromWei(amountInWei, 'ether')
  }

  if (typeof amountInWei === 'string') {
    return Web3.utils.fromWei(amountInWei, 'ether')
  }

  if (amountInWei === null || amountInWei === undefined) return '0.0'

  if (isNumberGEqZero(amountInWei)) {
    const bn = new Web3.utils.BN(amountInWei)
    return Web3.utils.fromWei(bn, 'ether')
  }

  throw Error('displayWei error for:' + amountInWei)
}

export function getWaitTimeInDays(waitTimeInSec) {
  const waitTimeInHours = waitTimeInSec / 60 / 60
  const days = Math.floor(waitTimeInHours / 24).toFixed(0)
  const hours = Math.floor(waitTimeInHours % 24).toFixed(0)
  const mins = Math.floor(waitTimeInHours % 60).toFixed(0)
  return `${days} days, ${hours}h, ${mins}min`
}

export function getClaimingDate(waitTimeInSec) {
  if (waitTimeInSec >= 0) {
    const now = Date.now()
    const newDate = new Date(now + waitTimeInSec * 1000 /*ms*/)
    return newDate.toLocaleDateString()
  }
  return null
}
