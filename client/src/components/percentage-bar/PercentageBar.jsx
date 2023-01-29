import React, { useRef, useState } from 'react'
import { useEffect } from 'react';
import './PercentageBar.scss'

export default function PercentageBar({item}) {
  
  const [ style, setStyle ] = useState({});

  let max = 6000
  let barProgress = (item.quantity / max) * 100
  let percentage = Math.ceil((item.quantity / max) * 100)
  
  setTimeout(() => {
    const newStyle = {
      opacity: 1,
      width: barProgress
    }
    setStyle(newStyle)
  }, 500);

  return (
    <div className='percentage'>
      <span className='per-num'>%{percentage}</span>

      <div className="stats">
        <span className="progress-text"></span>
        <div className="progress">
          <div className="progress-fill" style={style}></div>
        </div>
      </div>
    </div>
  )
}

// {percentage}
// style={style}