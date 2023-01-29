import React from 'react'
import './ChangeRole.scss'
import { useState } from 'react'
import {AiFillCheckSquare} from 'react-icons/ai'


export default function ChangeRole() {
  
  const [ productClass, setProductClass] = useState()

  const roleChangeHandler = (e) => {
    setProductClass(e.target.value)
  }

  console.log(productClass)

  return (
    <div className='change-role'>
      <div className='selection-bar'>
        <select value={productClass} onChange={roleChangeHandler}>
          <option>-- select --</option>
          <option value="Hight Quanlity">Hight Quanlity</option>
          <option value="Standard">Standard</option>
          <option value="Medium Quality">Medium Quality</option>
          <option value="Low Quality">Low Quality</option>
        </select>
      </div>
      <AiFillCheckSquare size={33} color={'var(--light-blue)'}/>
    </div>
  )
}
