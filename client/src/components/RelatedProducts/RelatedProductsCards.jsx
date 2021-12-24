import React from 'react';
import RelatedProductsCard from './RelatedProductsCard.jsx'

const RelatedProductsCards = (props) => (
  <div>

   {props.relatedProducts.map(item => {
     return<div className="related-card">
     <RelatedProductsCard
     key={item.id} name={item.name}
     category={item.category}
     />
     </div>
   })}

  </div>

)

export default RelatedProductsCards