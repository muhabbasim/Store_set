import React from 'react'
import './ProductsStats.scss'
import {GiShoppingCart} from 'react-icons/gi'
import {AiOutlineDollar} from 'react-icons/ai'
import {TbShoppingCartPlus} from 'react-icons/tb'
import {MdOutlineRemoveShoppingCart} from 'react-icons/md'
import InfoBox from '../user_info_box/InfoBox'


export default function UserStats({data}) {
  
  let offStock = data.filter((item) => item.quantity < 1)
  let atMinimum = data.filter((item) => item.quantity < 50)

  const offStockLenght = offStock.length
  const atMinimumLength = atMinimum.length
  let totalStock = data.length

  let total = 0
  data.map((item) => total = total + (item.quantity * item.price))

  // console.log((total).toFixed(2))

  const cart = <GiShoppingCart size={30} color="white"/>
  const refill = <TbShoppingCartPlus size={30} color="white"/>
  const offCart = <MdOutlineRemoveShoppingCart size={30} color="white"/>
  const dollar = <AiOutlineDollar size={30} color="white"/>
  
  return (
    <div className="user-stats">
      <h3 className='title'>Products Stats</h3>
      <div className="stats-container  --grid-15">
        <InfoBox  
          count={totalStock}
          title={'Total Products'}
          bgColor={"rgb(197, 102, 216)"}
          icon={cart}
        />
        {/* <InfoBox  
          count={onsStockLength}
          title={'On Stock Products'}
          bgColor={"rgb(63, 190, 63)"}
          icon={icon2}
        /> */}
        <InfoBox  
          count={atMinimumLength}
          title={'At Minimum Product '}
          bgColor={"rgb(54, 203, 240)"}
          icon={refill}
        />
        <InfoBox  
          count={offStockLenght}
          title={'Off Stock Products'}
          bgColor={"rgb(238, 190, 118)"}
          icon={offCart}
        />
        <InfoBox  
          count={`$${total}`}
          title={'Total Store Value'}
          bgColor={"rgb(63, 190, 63)"}
          icon={dollar}
        />
      </div>
    </div>
  )
}
