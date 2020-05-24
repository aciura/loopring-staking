import React from 'react'
import { displayWei } from './utils'

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
