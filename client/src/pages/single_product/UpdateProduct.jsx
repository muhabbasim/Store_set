import React, { useState, useEffect } from 'react'
import './UpdateProduct.scss'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
import ChangeRole from '../../components/change_role/ChangeRole'
import SideBar from '../../components/side_bar/SideBar'
export default function UpdateProduct() {
  
  // const [ formData , setFormData ] = useState({
  //   name: "",
  //   quantity: "",
  //   price: "",
  //   classification: "standard"
  // })
  // const { name, quantity, price, classification } = formData

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target
  //   setFormData({...formData, [name]: value})
  // }

  const location = useLocation()
  const productId = location.pathname.split("/")[2];
  const [ data , setData ] = useState("")


  const [name, setName] = useState(''); 
  const [quantity, setQuantity] = useState(data?.quantity || '');
  const [price, setPrice] = useState(data?.price || '');
  const [classification, setClassification] = useState(data?.classification || '');

  const [response, setResponse] = useState(); 
  const [error, setError] = useState(); 
  const [updatedData, setUpdatedData] = useState(); 
  

  useEffect(() => {
    const dataFetcher = async (req, res) => {
      try {
        const res = await axios.get(`http://localhost:3000/api/products/singleproduct/${productId}`)
        setData(res.data)

      } catch (error) {
        console.log(error)
      }
    } 

    dataFetcher()
  },[response])

  const updateProduct = async (e) => {
    e.preventDefault()

    try {
      const res = await axios.patch(`http://localhost:3000/api/products/updateproduct/${data._id}`, {
        name, 
        quantity,
        price,
        classification,
      })
      setResponse(res.data.message)
      setUpdatedData(res.data.data)

    } catch (err) {
      setError(err.response.data.message)
      console.log(err)
    }
  }

  return (
    <section className='update-product-section'>
      <div className="side-bar">
        <SideBar/>
      </div>

      <section className='update-product'>
        <div className='update-product-page'>
          <h1>Update Product</h1>
          <div className='product-info'>
            <span> <small>Name:</small> {data.name}</span>
            <span><small>Quantity:</small> {data.quantity}</span>
            <span><small>Price:</small> {data.price}</span>
            <span><small>Classification:</small> {data.classification}</span>
            
          </div>
          <form className=''>
            <input required 
              className='email-input'
              type="text" 
              placeholder='Product name' 
              name='name' 
              value={name} 
              onChange={(e)=> setName(e.target.value)}
            />
            <input required 
              className='email-input'
              type="number" 
              placeholder='Product Quantity' 
              name='quantity' 
              value={quantity} 
              onChange={(e)=> setQuantity(e.target.value)}
            />
            <input required 
              className='email-input'
              type="number" 
              placeholder='P/U Price' 
              name='price' 
              value={price} 
              onChange={(e)=> setPrice(e.target.value)}
            />
            
            <ChangeRole  
              name='classification' 
              value={classification} 
              onChange={(e)=> setClassification(e.target.value)}
            />
            
            
          </form>
          <div className='msg'>
            { error && <span>{error}</span>}
            { response && <span>{response}</span>}
          </div>
          <button className='--btn add-product-btn'
            type='submit'
            onClick={updateProduct}>Update Product
          </button>
        </div>
      </section>
    </section>
  )
}
