import React, { useContext, useState } from 'react'
import './ChangePass.scss'
import PasswordInput from '../../components/password_Input/PasswordInput'
import ProfileMenu from '../../components/profileMenu/ProfileMenu'
import { AuthContext } from '../../context/authContext'
import SideBar from '../../components/side_bar/SideBar'

export default function ChangePass() {

  const { changePasswordAPI } = useContext(AuthContext)

  const initialState = {
    currentPass: "",
    newPass: "",
    confirmNewPass: "",
  }
  const [ changePassword, setChangePassword ] = useState(initialState) 
  const { currentPass, newPass, confirmNewPass } = changePassword

  const [ error, setError ] = useState()
  
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setChangePassword({ ...changePassword, [name]: value })
  }

  const hangelChangePassword = async (e) => {
    e.preventDefault()

    try {
      await changePasswordAPI(changePassword);
      // navigate('/')

    } catch (err) {
      setError(err.response.data.message);
      console.log(err)
    }
  } 

  return (
    <section>
      <div className="side-bar">
        <SideBar/>
      </div>

      <div className='password-change --center-all'>
        <div className="header">
          <ProfileMenu title="Change password"/>
        </div>
        <div className="profile-card">
        
          <form>
            <div className='item'>
              <label>Current Password:</label>
              <PasswordInput 
                name='currentPass'
                value={currentPass}
                placeholder='Current Password' 
                onChange={handleInputChange}
              />
            </div>
            <div className='item'>
              <label>New Password:</label>
              <PasswordInput 
                name='newPass'
                value={newPass}
                placeholder='New Password' 
                onChange={handleInputChange}
              />
            </div>
            <div className='item'>
              <label>Confirm New Password:</label>
              <PasswordInput 
                name='confirmNewPass'
                value={confirmNewPass}
                placeholder='Confirm New Password' 
                onChange={handleInputChange}
              />
            </div>
          </form>
          {error && <div className="msg">
            <span>{error}</span>
          </div>}
          <button className='--btn update-btn'
            onClick={hangelChangePassword}
          >Change Password</button>
        </div>
      </div>
    </section>
  )
}
