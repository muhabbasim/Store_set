import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Login.scss'
import PasswordInput from '../../components/password_Input/PasswordInput'
import {SlLogin} from 'react-icons/sl'
import { AuthContext } from '../../context/authContext'


export default function Login() {

  const navigate = useNavigate()
  
  const initialData = {
    email: '',
    password: ''
  }

  const [ formData, setFormData ] = useState(initialData)
  const { password, email } = formData

  const [ error, setError ] = useState(null)


  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({...formData, [name]: value})
  }

  const {login} = useContext(AuthContext);


  const loginUser = async e => {
    e.preventDefault()

    try {
      await login(formData)
      navigate('/products')

    } catch (err) {
      setError(err.response.data)
      console.log(err)
    }
  }


  return (
    <section className='login-auth'>
      <div className='login-page'>
        <div className='--center-all' >
          <SlLogin size={25} color="gray"/>
        </div>
        <h1>Login</h1>
        <div className='--center-all' style={{marginBottom: 10}}>
          <Link className='--link' to="">
            <button className='--btn' style={{marginBottom: 10, backgroundColor: "var(--fail)"}}>Login With Google</button>
          </Link>
          <span>or</span>
        </div>

        <form>
          <input required 
            className='email-input'
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

          { error && <span className='msg'>{error}</span>}
          
          <button className='--btn login-btn'  
            onClick={loginUser}
          >
            Login
          </button>

          <Link className='--link' to='/forgotpassword'>
            <small>Forgot your password</small>
          </Link>
          <span>You don't have an account? <Link className='--link' to='/register'>Register</Link></span>
          <Link className='--link' to='/'>
            <small>Home</small>
          </Link>
        </form>
      </div>
    </section>
  )
}
