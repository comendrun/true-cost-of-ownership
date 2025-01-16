import React from 'react'
import './spinner.css'

interface CircularSpinnerProps {
  size?: number
  color?: string
}

export default function CircularSpinner({
  size = 70,
  color = 'bg-primary'
}: CircularSpinnerProps) {
  const spinnerStyle = {
    width: size,
    height: size
  }

  const circleStyle = {
    width: size,
    height: size
  }

  const circleBeforeStyle = {
    // backgroundColor: color,
    width: size / 7,
    height: size / 7
  }

  return (
    <div className='mul7' style={spinnerStyle}>
      {[...Array(12)].map((_, index) => (
        <div
          key={index}
          className={`mul7circ m7c${index + 1}`}
          style={circleStyle}
        >
          <div className={`circle-before ${color}`} style={circleBeforeStyle}></div>
        </div>
      ))}
    </div>
  )
}