import React from 'react'
import styles from './InputSlider.module.scss'

function InputSlider({ onChange, initialPercent = 0, disabled = false }) {
  const init = Math.min(100, Math.ceil(initialPercent))
  const [rangePercent, setRangePercent] = React.useState(0)

  React.useEffect(() => {
    setRangePercent(init)
  }, [init])

  const handleChange = (e) => {
    onChange(e.target.value)
    setRangePercent(+e.target.value)
  }

  return (
    <div className={styles.InputSlider} disabled={disabled}>
      <input
        type="range"
        value={rangePercent}
        onChange={handleChange}
        style={{ filter: `hue-rotate(-${rangePercent}deg)` }}
        disabled={disabled}
      />
      <div className={styles.h4Container}>
        <div className={styles.h4Subcontainer}>
          <h4
            style={{
              transform: `translateX(-50%) scale(${1 + rangePercent / 100})`,
              left: `calc(20% + ${rangePercent}%)`,
            }}
          >
            {rangePercent}
            <span style={{ filter: `hue-rotate(-${rangePercent}deg)` }}></span>
          </h4>
        </div>
      </div>
    </div>
  )
}

export default InputSlider
