import React from 'react'
import './SideBar.scss'
import { MdSpaceDashboard } from 'react-icons/md'
import { MdDashboardCustomize } from 'react-icons/md'
import { MdAccountCircle } from 'react-icons/md'
import { RiMessage3Fill } from 'react-icons/ri'
import { RiArrowUpSLine } from 'react-icons/ri'
import { RiArrowDownSLine } from 'react-icons/ri'
import { NavLink } from 'react-router-dom'
import { useState } from 'react'

export default function SideBar() {
  
  const [ dropDownArrow, setDropDownArrow ] = useState(false) 
  const [ openDropDown, setOpenDropDown ] = useState(false) 

  let activeStyle = {
    textDecoration: "none",
    color: "var(--light-blue)",
    boxShadow: 'var(--box-shadow)',
    borderRight: '3px solid var(--light-blue)'
  };

  let activeStyle2 = {
    textDecoration: "none",
    color: "var(--light-blue)",
    boxShadow: 'var(--box-shadow)',
    // borderRight: '3px solid var(--light-blue)'
  };

  const dropwonMenu = () => {
    setDropDownArrow(!dropDownArrow)
    setOpenDropDown(!openDropDown)
  }

  return (
    <div className='side-bar'>
      <div className="mini-nav"></div>
     
      <NavLink to="/products" 
          style={({isActive}) => (isActive ? activeStyle2 : null)}
          className="-link"
        >
        <div className="option">
          <MdSpaceDashboard size={30}/>
          <span>Dashboard</span>
        </div>
      </NavLink>

      <NavLink to="/addproduct" 
          style={({isActive}) => (isActive ? activeStyle2 : null)}
          className="-link"
        >
        <div className="option">
          <MdDashboardCustomize size={30}/>
          <span>Add Product</span>
        </div>
      </NavLink>

      <NavLink className="-link">
        <div className="option-drop">
          <div onClick={dropwonMenu} style={{display: "flex", alignItems: 'center', gap: 15}}>
            <MdAccountCircle size={30}/>
            <span>Account</span>
          </div>

          { dropDownArrow 
            ? <RiArrowDownSLine style={{position: 'absolute', top: 14, right: 10}} size={25}/>
            : <RiArrowUpSLine style={{position: 'absolute', top: 14, right: 10}} size={25}/>
          }

          <div className={openDropDown ? "drop-down-off" : "drop-down"}>
            <NavLink 
              style={({isActive}) => (isActive ? activeStyle : null)}
              className="-link" to='/profile'
              >
              <div className="dropdown-menu">
                <span>Profile</span>
              </div>
            </NavLink>

            <NavLink 
              style={({isActive}) => (isActive ? activeStyle : null)}
              className="-link" to='/updateprofile'
              >
              <div className="dropdown-menu">
                <span> Update Profile</span>
              </div>
            </NavLink>
          </div>
        </div>
      </NavLink>

      <div className="option">
        <RiMessage3Fill size={30}/>
        <span>Report Bug</span>
      </div>
    </div>
  )
}
