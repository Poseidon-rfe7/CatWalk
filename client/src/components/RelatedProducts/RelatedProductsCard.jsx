import React, {useState, useEffect} from 'react';
import FiveStar from '../FiveStar.jsx'


const RelatedProductsCard = (props) => (
  <div className="product-card-contents">

     <i id="related-action" className="related-action far fa-star" onClick={props.starhandler} serial={props.serial} slot={props.slot}/>

    <div className="product-image" serial={props.serial}
    onClick={props.changeproduct}>

      {props.loaded
      ? <img className="fit-picture" src={props.photo} alt="product image" serial={props.serial} onClick={props.changeproduct}/>
      : <div>Loading...</div>

       }

    </div>


    <div className="product-info" serial={props.serial} onClick={props.changeproduct}>
      {props.name}
      <br/>
      <div className="style-tag">
      style: {props.category}
      </div>
      <FiveStar rating={props.rating}/>
    </div>

  </div>
)

export default RelatedProductsCard