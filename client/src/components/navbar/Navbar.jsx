import React, { useContext } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import './Navbar.scss'
import {CiUser} from 'react-icons/ci'
import { AuthContext } from '../../context/authContext'

export default function Navbar() {
  const navigate = useNavigate()
  
  const activeLink = ({isActive}) => (isActive? "--active" : null) 
  const goHome = () => navigate('/')
  
  const { currentUser, logout } = useContext(AuthContext)

  const handleLogout = (e) => {
    e.preventDefault()
    logout();
    navigate("/");
  }

  return (
    <div className='--flex-between navbar'>
      <div className="icon">
       <h2 onClick={ goHome }>STORESET</h2>
      </div>
      <ul>
        { currentUser && <li>
          {/* <CiUser size={20} color={"white"}/> */}
          <Link className='--link' to='/profile'><img src={currentUser.photo} alt="" /></Link>
          <span>Hi, {
            currentUser
              ? currentUser.name
              : null
            } |
          </span>
        </li>}

        {currentUser && <li>
          <Link className='--link'>
            <button className='--btn login' onClick={handleLogout}>Logout</button>
          </Link>
        </li>}

        {!currentUser && <li>
          <Link className='--link' to="/login">
            <button className='--btn login'>Login</button>
          </Link>
        </li>}
        {!currentUser && <li>
          <Link className='--link' to="/register">
            <button className='--btn register'>register</button>
          </Link>
        </li>}
      </ul>
    </div>
  )
}
