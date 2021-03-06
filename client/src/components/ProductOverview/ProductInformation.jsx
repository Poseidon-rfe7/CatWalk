import React, {useEffect, useState} from 'react';
import FiveStar from '../FiveStar.jsx';

const ProductInformation = (props) => {


  var url = "https://developer.mozilla.org/en-US/docs/Web/CSS/cursor";
  var user_id = "itahand-naizir";
  var hash_tags = "JS,JavaScript,100DaysOfCode,Programming";
  var params = "menubar=no,toolbar=no,status=no,width=570,height=570";


  const faceHandler = (ev) => {
    let shareUrl = `http://www.facebook.com/sharer/sharer.php?u=${url}`;
    window.open(shareUrl, "NewWindow", params);
  }

  const twitterHandler = (ev) => {
    let shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${'nope'}&via=${user_id}&hashtags=${hash_tags}`;
    window.open(shareUrl, "NewWindow", params);
  }

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

      <div className="social-btns">
        <h3>{`Share on social media`}</h3>
        <button className="btn_social"
        role="button"
        href="#"
        onClick={faceHandler}>
          Meta
        </button>

        <button className="btn_social"
        href="#"
        role="button"
        onClick={twitterHandler}>
          Twitter
        </button>

      </div>
    </div>
  )
}

export default ProductInformation;