import React, { useContext } from 'react'
import './UpdateProfile.scss'
import { useState } from 'react'
import ProfileMenu from '../../components/profileMenu/ProfileMenu'
import { AuthContext } from '../../context/authContext'
import { Link } from 'react-router-dom'
import SideBar from '../../components/side_bar/SideBar'


export default function UpdateProfile() {

  const { currentUser } = useContext(AuthContext)

  const initialState = {
    username: currentUser.name,
    email: currentUser.email,
    phone: currentUser.phone,
    image: currentUser.photo,
    bio: currentUser.bio,
    role: "",
  }
  const [ profile, setProfile ] = useState(initialState) 
  const { username, email, phone, bio, role, image } = profile


  const handleImageChange = () => {

  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setProfile({ ...profile, [name]: value })
  }


  return (
    <section className='update-profile-page'>
      <div className="side-bar">
        <SideBar/>
      </div>
      <div className='profile --center-all'>
        <div className="header">
          <ProfileMenu title=" Update Profile"/>
        </div>
       
        <div className="profile-card">
          <div className="user">
            <div className="user-img">
              <img src={image} alt=""/>
              <h4>Admin</h4>
            </div>
            <div className='image-upload'>
              <h4>Change Photo</h4>
              <div className='file-upload'>
                <input type="file" 
                accept='image/*'
                name='image' 
                onChange={handleImageChange}
                />
              </div>
            </div>
            <div className='change-pass'>
              <Link style={{color: "var(--fail)", textDecoration: "underline"}} 
                className="--link" to="/changepassword"
                >
                  Change Password 
              </Link>
            </div>
          </div>
          <form>
            <div>
              <div className='item'>
                <label>Username:</label>
                <input type="text" 
                  name='username'
                  value={username}
                  placeholder='Username' 
                  onChange={handleInputChange}
                />
              </div>
              <div className='item'>
                <label>Email:</label>
                <input type="text" 
                  disabled
                  placeholder='example@gmail.com' 
                  name='email'
                  value={email}
                  onChange={handleInputChange}
                />
              </div>
              <div className='item'>
                <label>Phone:</label>
                <input type="text" 
                  name='phone'
                  value={phone}
                  placeholder='+9662143492'
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className='item'>
              <label>Bio:</label>
              <textarea id="" cols="30" rows="5" 
              name='bio'
              value={bio} 
              placeholder='Write something about you' 
              onChange={handleInputChange}/>
            </div>
            <button className='--btn update-btn'>Update Profile</button>
          </form>
        </div>
      </div>
    </section>
  )
}
