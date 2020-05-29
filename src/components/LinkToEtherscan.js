import React from 'react'

export function LinkToEtherscan({ label, address, children }) {
  function getUrl(address) {
    return `https://etherscan.io/address/${address}`
  }

  return (
    <div>
      <span>{label}&nbsp;</span>
      <a href={getUrl(address)}>{address}</a>
      {children}
    </div>
  )
}
