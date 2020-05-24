import React from 'react'
import Web3 from 'web3'
import InputSlider from '../InputSlider/InputSlider'
import { convertLrcToWei, displayWei } from '../utils'

export default function ChangeAmount({
  text,
  max,
  amount,
  submitAmountChange,
  tokenSymbol = 'LRC',
}) {
  const inputRef = React.useRef(null)
  const [hasChanged, setHasChanged] = React.useState(false)
  const [newAmount, setNewAmount] = React.useState(0)

  React.useEffect(() => {
    updateAmount(amount, false)
  }, [amount])

  // console.log('ChangeAmount', {
  //   text,
  //   max: max?.toString(),
  //   amount: amount?.toString(),
  //   newAmount: newAmount?.toString(),
  //   hasChanged,
  // })

  const updateAmount = (newValue, hasChanged = true) => {
    // console.log('updateAmount', newValue)
    if (newValue >= 0) {
      setNewAmount(newValue)
      inputRef.current.value = displayWei(newValue)
      if (hasChanged) setHasChanged(true)
    }
  }

  const handleBlur = (newLrcValue) => {
    // console.log('allowanceInputChange', { newLrcValue })
    if (+newLrcValue >= 0) {
      updateAmount(convertLrcToWei(newLrcValue))
    }
  }

  const sliderChange = (sliderValue) => {
    // console.log('sliderChange', { max: max?.toString(), sliderValue })
    let amountBN = new Web3.utils.BN(max)
    amountBN = amountBN.muln(+sliderValue)
    amountBN = amountBN.divn(100)

    updateAmount(amountBN)
  }

  const submit = () => {
    submitAmountChange(newAmount)
    updateAmount(0)
  }

  const isDisabled = max <= 0

  return (
    <>
      <label>{text}</label>&nbsp;
      <input
        type="text"
        ref={inputRef}
        onChange={(e) => {
          setHasChanged(true)
        }}
        onBlur={(e) => handleBlur(e.target.value)}
        disabled={isDisabled}
      />{' '}
      {tokenSymbol}
      <input
        type="submit"
        value="Approve"
        onClick={submit}
        disabled={isDisabled || !hasChanged}
      />
      <InputSlider
        onChange={sliderChange}
        initialPercent={(newAmount / max) * 100}
        disabled={isDisabled}
      />
    </>
  )
}
