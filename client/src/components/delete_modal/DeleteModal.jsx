import React from 'react'
import './DeleteModal.scss'

export default function DeleteModal({setModalIsOpen, handleDelete}) {
  
  return (
    <div className='delete-modal'>
      <div className="modal">
        <h2>Delete Product!!</h2>
        <span>Are you sure you want to delete this...</span>
        <div className="btns">
          <button className="delete-btn" onClick={(e) => handleDelete()}>Delete</button>
          <button className="cancel-btn" onClick={(e) => setModalIsOpen(false)}>Cancel</button>
        </div>
      </div>
    </div>
  )
}
