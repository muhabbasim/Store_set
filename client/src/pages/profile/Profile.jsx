import React, { useContext } from 'react'
import './Profile.scss'
import userAvatar from '../../assets/user avatar.jpeg'
import userImg from '../../assets/anoos.avif'
import { useState } from 'react'
import ProfileMenu from '../../components/profileMenu/ProfileMenu'
import { AuthContext } from '../../context/authContext'
import { Link } from 'react-router-dom'
import SideBar from '../../components/side_bar/SideBar'


export default function Profile() {

  const { currentUser } = useContext(AuthContext)

  const initialState = {
    username: currentUser.name,
    email: currentUser.email,
    phone: currentUser.phone,
    image: currentUser.photo,
    bio: currentUser.bio,
    role: "",
    isVerified: false
  }
  const [ profile, setProfile ] = useState(initialState) 
  const { username, email, phone, bio, role, image, isVerified } = profile

  console.log(currentUser.photo)

  const handleImageChange = () => {

  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setProfile({ ...profile, [name]: value })
  }


  return (
    <section className='profile-page'>
      <div className="side-bar">
        <SideBar/>
      </div>
      <div className='profile --center-all'>
        <div className="header">
          <ProfileMenu title="Profile"/>
        </div>
       
        <div className="profile-card">
          <div className="user">
            <div className="user-img">
              <img src={image} alt=""/>
              
            </div>
          </div>

          <form>
            <div className='item'>
              <label>Role: Admin</label>
            </div>
            <div className='item'>
              <label>Username: {username}</label>
            </div>
            <div className='item'>
              <label>Email: <span style={{color: "var(--fail)"}}>{email}</span></label>
            </div>
            <div className='item'>
              <label>Phone: {phone}</label>
            </div>
            <div className='item'>
              <label>Bio: <span style={{color: "var(--light-blue)"}}>{bio}</span></label>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
