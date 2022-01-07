import React, {useEffect, useState} from 'react';
import FiveStar from '../FiveStar.jsx';

const ProductInformation = (props) => {


  return (

    <div className='product-information-container'>
      <div className='product-info-title'>Product Information</div>



      <p className='product-info-name'>{props.currentProduct.name}</p>
      <p className='product-info-cat'>{props.currentProduct.category}</p>
      <div className='product-info-description'>{props.currentProduct.description}</div>
      <p className='product-info-price'>{props.stylePrice}</p>
      <div className='fivestar-product'>
        <FiveStar rating={props.currentRatings} />
      </div>
    </div>
  )
}

export default ProductInformation;