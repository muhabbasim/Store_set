import React, { useState } from 'react'
import './Products.scss'
import ProfileMenu from '../../components/profileMenu/ProfileMenu'
import ProductStat from '../../components/products_stats/ProductsStats'
import SearchBar from '../../components/search_bar/SearchBar'
import Product from '../../components/product/Product'
import axios from 'axios';

import {GoDiffAdded} from 'react-icons/go'
import {products} from '../../data'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Spinner } from '../../components/loader/Loader'
import SideBar from '../../components/side_bar/SideBar'

export default function Products() {

  const [ data, setData ] = useState([])
  const [ isLoading, setIsLoading ] = useState(true)

  // query function
  const [ query, setQuery ] = useState("")
  const keys =[ 'name', 'quantity', 'price']
  const handleSearchInput = (e) => {
    setQuery(e.target.value)
  }

  // fetch data from server
  useEffect(() => {

    const dataFetcher = async (req, res) => {
      try {
        const res = await axios.get("http://localhost:3000/api/products/getallproducts")
        const products = res.data
        setData(products)
        setIsLoading(false)
        
      } catch (error) {
        console.log(error)
      }
    } 

    dataFetcher()
  },[data])
  

  return (
    <section className='main-store-page'>
      <section className="side-bar">
        <SideBar/>
      </section>
      <section className='products'>
        <div className="container">
          <ProfileMenu/>
          <ProductStat data={data}/>

          <div className="user-search">
            <h3>All Products</h3>
            <SearchBar onChange={handleSearchInput}/>
          </div>
          { isLoading 
              ? <div className="loader-container">
                  <Spinner/>
                </div>
              : 
                <table>
                  <thead>
                    <tr>
                      <th>s/n</th>
                      <th>Name</th>
                      <th>Percentage</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Classification</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  {/* <tbody> */}
                    {data.filter((item)=> 
                      keys.some((key)=> item[key].toString().toLowerCase().includes(query)) 
                      ).map((item, index)=> {
                      return (
                        <tbody >
                          <Product  key={item._id} index={index} item={item} />
                        </tbody>
                      )
                    })}
                  {/* </tbody>  */}
                </table>
            }
        </div>
      </section>
    </section>
  )
}
