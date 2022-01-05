import React, {useState, useEffect} from 'react';
import FiveStar from '../FiveStar.jsx'


const RelatedProductsCard = (props) => (
  <div className="product-card-contents">



    <div className="product-image" serial={props.serial}
    onClick={props.changeproduct}>

      {props.loaded
      ? <img className={`fit-picture ${props.active ? "active-pic": "deactive-pic"}`} src={props.photo} alt="product image" serial={props.serial} onClick={props.changeproduct}/>
      : <div>Loading...</div>

       }

    </div>

    <i id="related-action" className="related-action far fa-star" onClick={props.starhandler} serial={props.serial} slot={props.slot}/>


    <div className="product-info" serial={props.serial} onClick={props.changeproduct}>
      {props.name}
      <br/>
      <div className="style-tag">
      style: {props.category}
      </div>
      <div className="card-5star" >
      <FiveStar  rating={props.rating}/>

      </div>
    </div>

  </div>
)

export default RelatedProductsCard