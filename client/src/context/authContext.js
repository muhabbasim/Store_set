import { createContext, useState, useEffect } from 'react'
import axios from 'axios';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {

  // get users from localStorage if exixts
  const [ currentUser, setCurrentUser ] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
 
  // get the login axios from the login page
  const login = async (formData) => {
    const res = await axios.post("http://localhost:3000/api/users/login", formData)
    console.log(res.data)
    setCurrentUser(res.data)
  }

  const logout = async () => {
    await axios.get("http://localhost:3000/api/users/logout")
    setCurrentUser(null)
  }

  const changePasswordAPI = async (formData) => {
    const res = await axios.patch("http://localhost:3000/api/users/changepassword", formData)
    console.log(res)
  }

  useEffect(()=> {
    localStorage.setItem('user', JSON.stringify(currentUser))
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ login, logout, currentUser, changePasswordAPI }}>
      {children}
    </AuthContext.Provider>
  )
}