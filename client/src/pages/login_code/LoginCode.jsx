import React from 'react'
import { Link } from 'react-router-dom'
import '../login/Login.scss'
import {FiUnlock} from 'react-icons/fi'
import { useState } from 'react'



export default function LoginCode() {

  const [ loginCode, setLoginCode ] = useState('')

  const handleInputChange = (e) => {
    setLoginCode(e.target.value)
  }

  const loginUser = () => {
    
  }


  return (
    <section className='auth'>
      <div className='login-page'>
        <div className='--center-all' >
          <FiUnlock size={30} color="gray"/>
        </div>
        <h1>Enter Access Code</h1>

        <form onSubmit={loginUser}>
          <input required 
            type="text" 
            placeholder='Access Code' 
            name='loginCode' 
            value={loginCode} 
            onChange={handleInputChange}
          />
          <button className='--btn login-btn'>Proceeed To Login</button>
          
          <span>Check your email for login access code</span>
          <div style={{display: 'flex', justifyContent: "space-between"}}>
            <Link className='--link' to='/'>
              <small>- Home</small>
            </Link>
            <Link className='--link' to='/login'>
              <small>Reset Code</small>
            </Link>
          </div>
        </form>
      </div>
    </section>
  )
}
