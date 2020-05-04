import React from 'react'
import Web3 from 'web3'

const BN = Web3.utils.BN

function isNumberGEqZero(value) {
  return typeof value == 'number' && value >= 0
}

export function convertLrcToWei(amountInLrc) {
  return Web3.utils.toWei(amountInLrc, 'ether')
}

export function weiMin(a, b) {
  if (a == null || a == undefined) return b
  if (b == null || b == undefined) return a

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

  throw 'displayWei error for:' + amountInWei
}

export function TokenAmount({ amountInWei, symbol = 'LRC' }) {
  const stringWithDot = displayWei(amountInWei)
  const [integerPart, fractionalPart] = stringWithDot?.split('.') ?? [0, 0]
  return (
    <>
      <span>{integerPart}</span>
      <span style={{ fontSize: '2rem' }}>.</span>
      <span style={{ fontSize: '0.75rem' }}>{fractionalPart ?? 0}</span>
      <span style={{ paddingLeft: '0.5em' }}>{symbol}</span>
    </>
  )
}
