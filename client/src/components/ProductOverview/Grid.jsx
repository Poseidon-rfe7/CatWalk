import React from 'react'
import ProductInformation from './ProductInformation.jsx'
import StyleSelector from './StyleSelector.jsx'
import AddToCart from './AddToCart.jsx'
import ImageGallery from './ImageGallery.jsx'

export default function Grid (props) {

  return (

    <div className="container">

      {props.children.map((child, i) => {
        return <div className="item" key={i}>{child}</div>
      })}

    </div>
  )
}