import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {BsTrash} from 'react-icons/bs'
import {FiEdit} from 'react-icons/fi'
import { Link } from 'react-router-dom'
import PercentageBar from '../percentage-bar/PercentageBar'
import './Product.scss'
import DeleteModal from '../delete_modal/DeleteModal'

export default function User({item, index}) {
  const [response, setResponse] = useState()
  const [error, setError] = useState()
  const [ modalIsOpen, setModalIsOpen ] = useState(false)

  const handleOpenModal = () => {
    setModalIsOpen(true)
  }

  const handleDelete = async () => {
    try {
      const res = await axios.delete(`http://localhost:3000/api/products/deleteproduct/${item._id}`)
      setResponse(res.data.message)
      console.log(res)

    } catch (err) {
      setError(err)
      console.log(error)
    }
  }

  return (
    <tr className='item-row'>
      <td>{index}</td>
      <td>{item.name}</td>
      <td>
        <div>
          <PercentageBar item={item}/>
        </div>
      </td>
      <td>{item.quantity}</td>
      <td>{item.price}</td>
      <td>{item.classification}</td>
      <td>
        <Link to={`/updateproduct/${item._id}`} state={item}>
          <FiEdit style={{marginRight: 20, cursor: "pointer"}} size={20} color={"green"}/>
        </Link> 
        <BsTrash style={{cursor: "pointer"}} 
          size={20} color={"red"}
          onClick={handleOpenModal}
        /> 
      </td>
      { modalIsOpen && <DeleteModal setModalIsOpen={setModalIsOpen} handleDelete={handleDelete}/>}
    </tr>
  )
}
