import React from 'react'
import { Link } from 'react-router-dom'
import './Home.scss'
import { useContext } from 'react'
import { AuthContext } from '../../context/authContext'
import hero from '../../assets/hero2.png'

export default function Home() {
  const { currentUser } = useContext(AuthContext)

  return (
    <div className='home'>
      <section className="body">
        <div className="left">
          <h1>
            The ultimate store management.
          </h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, voluptatem!</p>
          <br />
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolore beatae similique maxime veritatis atque assumenda!</p>
          
          {!currentUser && <Link className='--link' to='/register'><button className="--btn register">Register</button></Link>}
          {!currentUser &&<Link className='--link' to='/login'><button className="--btn login">Login</button></Link>}
          {currentUser &&<Link className='--link' to='/products'><button className="--btn register">Go To Dashbord</button></Link>}
          
        </div>
        <div className="right">
          <img src={hero} alt="" />
        </div>

      </section>
    </div>
  )
}
