import React, {useEffect, useState} from 'react';
import FiveStar from '../FiveStar.jsx';

const ProductInformation = (props) => {


  return (

    <div className='product-information-container'>
      <h1>Product Information</h1>

        <FiveStar rating={props.currentRatings} />


      <p>{props.currentProduct.category}</p>
      <p>{props.currentProduct.name}</p>
      <p>{props.stylePrice}</p>
      <div>{props.currentProduct.description}</div>
    </div>
  )
}

export default ProductInformation;