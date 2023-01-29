import React from 'react'
import { Link } from 'react-router-dom'
import './ForgetPass.scss'
import {HiOutlineMail} from 'react-icons/hi'
import { useState } from 'react'
import { useContext } from 'react'
import { AuthContext } from '../../context/authContext'
import axios from 'axios';


export default function ForetPass() {
  const initialState = {
    email: "" 
  }
  
  const [ emailInput, setEmailInput ] = useState(initialState)
  const { email } = emailInput

  const [ error, setError ] = useState()
  const [ response, setResponse ] = useState()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setEmailInput({...emailInput, [name]: value})
  }

  const handlleForgotPass = async (e) => {
    e.preventDefault()

    try {
      const res = await axios.post("http://localhost:3000/api/users/forgotpassword", emailInput)
      console.log(res.data)
      setResponse(res.data.message)

    } catch (err) {
      setError(err.response.data.message);
      console.log(err)
    }
  }



  return (
    <section className='forgot-auth'>
      <div className='login-page'>
        <div className='--center-all' >
          <HiOutlineMail size={40} color="gray"/>
        </div>
        <h1>Forgot Password</h1>

        <form>
          <input required 
            type="email" 
            placeholder='Email' 
            name="email"
            value={email} 
            onChange={handleInputChange}
          />

          {error && <div className="msg">
            <span>{error}</span>
          </div>}

          {response && <div className="msg">
            <span>{response}</span>
          </div>}

          <button className='--btn login-btn'
            onClick={handlleForgotPass}>
              Ger Reset Email
          </button>
          
          <span>You don't have an account? <Link className='--link' to='/register'>Regiter</Link></span>
          <div style={{display: 'flex', justifyContent: "space-between"}}>
            <Link className='--link' to='/'>
              <small>Home</small>
            </Link>
            <Link className='--link' to='/login'>
              <small>Login</small>
            </Link>
          </div>
        </form>
      </div>
    </section>
  )
}
