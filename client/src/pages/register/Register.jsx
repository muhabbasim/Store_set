import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Register.scss'
import PasswordInput from '../../components/password_Input/PasswordInput'
import {TiUserAddOutline} from 'react-icons/ti'
import {FaTimes} from 'react-icons/fa'
import {BsCheck2All} from 'react-icons/bs'
import axios from 'axios'

export default function Register() {

  // inputs trigger
  const initialData = {
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  }
  const [ formData, setFormData ] = useState(initialData)
  const { name, email, password, confirmPassword } = formData

  const [ error, setError ] = useState(null)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({...formData, [name]: value})
  }

  const navigate = useNavigate();

  // password validation states
  const [ upperCase, setUpperCase ] = useState(false)
  const [ number, setNumber ] = useState(false)
  const [ specialChar, setSpecialChar ] = useState(false)
  const [ charLength, setCharLength ] = useState(false)

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


  const registerUser = async (e) => {
    e.preventDefault()

    try {
      const res = await axios.post("http://localhost:3000/api/users/register", formData)
      console.log(res.data)
      navigate("/login");

    } catch (err) {
      setError(err.response.data)
      console.log(err)
    }
  }

  return (
    <section className="register-auth">
      <div className='register-page'>
        <div className='--center-all' >
          <TiUserAddOutline size={30} color="gray"/>
        </div>
        <h1>Register</h1>
        <form>

          <input required 
            className='inputs'
            type="text" 
            placeholder='Username' 
            name='name' 
            value={name} 
            onChange={handleInputChange} 
          />

          <input required 
            className='inputs'
            type="email" 
            placeholder='Email' 
            name='email' 
            value={email} 
            onChange={handleInputChange}
          />
          
          <PasswordInput 
            placeholder='Password' 
            name='password' 
            value={password}  
            onChange={handleInputChange}
          />

          <PasswordInput 
            placeholder='Confirm Password' 
            name='confirmPassword' 
            value={confirmPassword}  
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

        <div className="msg">
          { error && <span className=''>{error}</span>}
        </div>

        <button type='submit' onClick={registerUser} className='--btn register-btn'>Register</button>
        <span>You already have an account... <Link className='--link' to='/login'>Login</Link></span>

      </div>
    </section>
  )
}
