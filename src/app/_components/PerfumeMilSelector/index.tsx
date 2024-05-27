import React, { useState } from 'react'

import classes from './index.module.scss'

const PerfumeMilSelector = ({
  milOption,
  isPressed,
  handleClick = () => '',
}: {
  milOption: string
  isPressed: boolean
  handleClick: React.Dispatch<React.SetStateAction<string>>
}) => {
  return (
    <button
      type="button"
      className={`${classes.perfumeMilSelector} ${isPressed ? classes.pressed : ''}`}
      onClick={() => handleClick(milOption)}
    >
      {milOption}
    </button>
  )
}

export default PerfumeMilSelector
