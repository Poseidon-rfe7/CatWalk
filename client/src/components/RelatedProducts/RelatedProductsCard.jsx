import React from 'react';


const RelatedProductsCard = (props) => (
  <div className="product-card-contents">

    <div className="product-image" serial={props.serial}>

      {props.loaded
      ? <img className="fit-picture" src={props.photo} alt="product image" serial={props.serial}/>
      : <div>Loading...</div>

       }


    </div>

    <div className="product-info" serial={props.serial}>
      {props.name}
      <br/>
      <div className="style-tag">
      style: {props.category}
      </div>
    </div>

  </div>
)

export default RelatedProductsCard