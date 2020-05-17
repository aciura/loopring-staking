import React from 'react'
import Web3 from 'web3'
import InputSlider from '../InputSlider/InputSlider'
import { convertLrcToWei, displayWei } from '../utils'

export default function ChangeAmount({ max, amount, submitAmountChange }) {
  const inputRef = React.useRef(null)
  const [hasChanged, setHasChanged] = React.useState(false)
  const [newAmount, setNewAmount] = React.useState(0)

  const updateAmount = (newValue) => {
    console.log('updateAmount', newValue)

    if (newValue >= 0) {
      setNewAmount(newValue)
      inputRef.current.value = displayWei(newValue)
      setHasChanged(true)
    }
  }

  const handleBlur = (newLrcValue) => {
    console.log('allowanceInputChange', { newLrcValue })
    if (+newLrcValue >= 0) {
      updateAmount(convertLrcToWei(newLrcValue))
    }
  }

  const sliderChange = (sliderValue) => {
    console.log('sliderChange', { max, sliderValue })
    let amountBN = new Web3.utils.BN(max)
    amountBN = amountBN.muln(+sliderValue)
    console.log(amountBN.toString())
    amountBN = amountBN.divn(100)

    updateAmount(amountBN)
  }

  return (
    <>
      Allow spending:&nbsp;
      <input
        type="text"
        ref={inputRef}
        onChange={(e) => {
          setHasChanged(true)
        }}
        onBlur={(e) => handleBlur(e.target.value)}
      />{' '}
      LRC
      <input
        type="submit"
        value="Approve"
        disabled={!hasChanged}
        onClick={() => submitAmountChange(newAmount)}
      />
      <InputSlider
        onChange={sliderChange}
        initialPercent={(amount / max) * 100}
      />
    </>
  )
}
