import React, {useEffect, useState} from 'react';
import FiveStar from '../FiveStar.jsx';

const ProductInformation = (props) => {


  return (

    <div className='product-information-container'>
      <div className='product-info-title'>
        <p className='product-info-name'>{props.currentProduct.name}</p>
      </div>



      <div className='fivestar-product'>
        <FiveStar rating={props.currentRatings} />
      </div>

      <h2>{props.currentProduct.category}</h2>
      <div className='product-info-description'>{props.currentProduct.description}</div>

      <h2>{props.stylePrice}</h2>
    </div>
  )
}

export default ProductInformation;