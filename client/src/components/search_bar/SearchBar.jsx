import React from 'react'
import './SearchBar.scss'
import {FiSearch} from 'react-icons/fi'


export default function SearchBar({onChange}) {

  return (
    <div className="search-box">
      <FiSearch className='search-icon' size={15} color="black"/>
      <input type="search" 
        placeholder='Search products' 
        onChange={onChange}
      />
    </div>
  )
}
