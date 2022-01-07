import React, {useEffect, useState} from 'react';
import FiveStar from '../FiveStar.jsx';

const ProductInformation = (props) => {


  return (

    <div className='product-information-container'>
      <div className='product-info-title'><h2>Product Information</h2></div>



      <p className='product-info-name'>{props.currentProduct.name}</p>
      <div className='fivestar-product'>
        <FiveStar rating={props.currentRatings} />
      </div>
      <p className='product-info-cat'>{props.currentProduct.category}</p>
      <div className='product-info-description'>{props.currentProduct.description}</div>
      <p className='product-info-price'>{props.stylePrice}</p>
    </div>
  )
}

export default ProductInformation;