import React from 'react'
import './InfoBox.scss'


export default function InfoBox({ title, count, bgColor, icon }) {
  return (
    <div className="box-item" style={{backgroundColor: bgColor}}>
      <div className="icon">
      {icon}
      </div>
      <div className="stats">
        <h2>{title}</h2>
        <h3>{count}</h3>
      </div>
    </div>
  )
}
