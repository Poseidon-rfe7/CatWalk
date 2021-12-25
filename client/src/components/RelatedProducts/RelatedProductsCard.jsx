import React from 'react';


const RelatedProductsCard = (props) => (
  <div className="product-card-contents">

    <div className="product-image">

      {props.loaded
      ? <img className="fit-picture" src={props.photo} alt="product image"/>
      : <div>Loading...</div>

       }


    </div>

    <div className="product-info">
      {props.name}
      <br/>
      <div className="style-tag">
      style: {props.category}
      </div>
    </div>

  </div>
)

export default RelatedProductsCard