import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import './ResetPass.scss'
import PasswordInput from '../../components/password_Input/PasswordInput'
// import {TiUserAddOutline} from 'react-icons/ti'
import {FaTimes} from 'react-icons/fa'
import {BsCheck2All} from 'react-icons/bs'
import { AuthContext } from '../../context/authContext'
import axios from 'axios';


export default function ResetPass() {

  // inputs trigger
  const initialData = {
    password: "",
    ConfirmPassword: ""
  }
  const [ formData, setFormData ] = useState(initialData)
  const { password, ConfirmPassword } = formData

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({...formData, [name]: value})
  }

  // password validation states
  const [ upperCase, setUpperCase ] = useState(false)
  const [ number, setNumber ] = useState(false)
  const [ specialChar, setSpecialChar ] = useState(false)
  const [ charLength, setCharLength ] = useState(false)
  
  const { currentUser } = useContext(AuthContext)

  const resetPasswordAPI = async () => {
    const res = await axios.post(`http://localhost:3000/api/users/resetpassword/${currentUser.token}`, formData)
    console.log(res.data)
  }


  // check icons
  const unCheckItem = <FaTimes color="red"/>
  const checkIcon = <BsCheck2All color="green"/>

 
  // checkIcon swicher
  const swichIcon = (condition) => {
    if(condition) {
      return checkIcon
    } else {
      return unCheckItem
    }
  }

  //password validation
  useEffect(()=> {
    //uppercase validation
    if (password.match(/.*[A-Z]/)) {
      setUpperCase(true)
    } else {
      setUpperCase(false)
    }

    //password length validation
    if (password.length > 5) {
      setCharLength(true)
    } else {
      setCharLength(false)
    }

    //numerical validation
    if (password.match(/[0-9]/)) {
      setNumber(true)
    } else {
      setNumber(false)
    }

    //special character validation
    if (password.match(/[ !"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/)) {
      setSpecialChar(true)
    } else {
      setSpecialChar(false)
    }
  })


  const registerUser = () => {
    
  }

  return (
    <section className="auth">
      <div className='register-page'>
        <div className='--center-all' >
         <h2>****</h2>
        </div>
        <h1 style={{color: "rgb(221, 150, 68)"}}>Reset Password</h1>
        <form onSubmit={registerUser}>
          <PasswordInput 
            placeholder='Password' 
            name='password' 
            value={password}  
            onChange={handleInputChange}
          />

          <PasswordInput 
            placeholder='Confirm Password' 
            name='ConfirmPassword' 
            value={ConfirmPassword}  
            onChange={handleInputChange}
          />
          
        </form>

        <ul className="passowrd-validation">
          <li>
            <span>
              {swichIcon(upperCase)}
              UpperCase & LowerCase
            </span>
          </li>
          <li>
            <span>
            {swichIcon(number)}
              Number (0-9)
            </span>
          </li>
          <li>
            <span>
            {swichIcon(specialChar)}
              Special Character (@ # $ % & *)
            </span>
          </li>
          <li>
            <span>
              {charLength? checkIcon : unCheckItem}
              At least 6 Character
            </span>
          </li>
        </ul>

        <button style={{backgroundColor: "var(--light-blue)"}} className='--btn register-btn'>Reset Password</button>
        <div style={{display: 'flex', justifyContent: "space-between"}}>
          <Link className='--link' to='/'>
            <small>- Home</small>
          </Link>
          <Link className='--link' to='/login'>
            <small>- Login</small>
          </Link>
        </div>
      </div>
    </section>
  )
}
