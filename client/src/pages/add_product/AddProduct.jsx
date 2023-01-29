import React, { useState } from 'react'
import './AddProduct.scss'
import axios from 'axios'
import ChangeRole from '../../components/change_role/ChangeRole'
import {AiFillCheckSquare} from 'react-icons/ai'
import SideBar from '../../components/side_bar/SideBar'
import { Spinner, Spinner2 } from '../../components/loader/Loader'


export default function AddProduct() {

  const [ error, setError ] = useState(null)
  const [ response, setResponse ] = useState(null)
  const [ loader, setLoader ] = useState(false)

  const [ name, setName] = useState("")
  const [ quantity, setQuantity] = useState("")
  const [ price, setPrice] = useState("")
  const [ classification, setClassification] = useState("")
  
  const addProduct = async (e)=> {
    e.preventDefault()

    try {
      setLoader(true)
      const product = await axios.post("http://localhost:3000/api/products/addproduct", {
        name,
        quantity,
        price,
        classification
      })
      setLoader(false)

      console.log(product.data.message)
      setResponse(product.data.message)

    } catch (err) {
      setError(err.response.data.message)
      console.log(error)
    }

    setClassification("")
    setName("")
    setPrice("")
    setQuantity("")
  }

  return (
    <div className="add-product-section">
      <div className="side-bar">
        <SideBar/>
      </div>
      <section className='add-product'>
        <div className='add-product-page'>
          <h1>Add Product</h1>

          <form>
            <input required 
              className='email-input'
              type="text" 
              placeholder='Product name' 
              name='name' 
              value={name} 
              onChange={e => setName(e.target.value)}
            />
            <input required 
              className='email-input'
              type="number" 
              placeholder='Product Quantity' 
              name='quantity' 
              value={quantity} 
              onChange={e => setQuantity(e.target.value)}
            />
            <input required 
              className='email-input'
              type="number" 
              placeholder='P/U Price' 
              name='price' 
              value={price} 
              onChange={e => setPrice(e.target.value)}
            />
            <div className='change-role'>
              <div className='selection-bar'>
                <select value={classification} onChange={e => setClassification(e.target.value)}>
                  <option>-- select --</option>
                  <option value="Hight Quanlity">Hight Quanlity</option>
                  <option value="Standard">Standard</option>
                  <option value="Medium Quality">Medium Quality</option>
                  <option value="Low Quality">Low Quality</option>
                </select>
              </div>
              <AiFillCheckSquare size={33} color={'var(--light-blue)'}/>
            </div>
          </form>
          
          <div className='msg'>
            {loader && <Spinner2/>}
            { error && <span>{error}</span>}
            { response && <span>{response}</span>}
          </div>
          <button className='--btn add-product-btn'
            type='submit'
            onClick={addProduct}> + Add Product
          </button>
        </div>
      </section>
    </div>
  )
}
