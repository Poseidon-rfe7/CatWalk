import React from 'react';
import RelatedProductsCard from './RelatedProductsCard.jsx'

const RelatedProductsCards = (props) => (
  <div>

   {props.relatedProducts.map(item => {
     return <RelatedProductsCard key={item.id} name={item.name}/>
   })}

  </div>

)

export default RelatedProductsCards