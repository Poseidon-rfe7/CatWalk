import React, {useState} from 'react';
import RelatedProductsCard from './RelatedProductsCard.jsx'

const RelatedProductsCards = (props) => {
  return(
  <div className="related-cards-list">

   {props.relatedProducts.map(item => {
     return(
     <div key={item.id} className="related-card">
     <RelatedProductsCard name={item.name} category={item.category}
     photo={props.relatedProductsPhotos[item.id]}
     loaded={props.photosLoaded}
     />
     </div>
     )})}

  </div>

  )
}

export default RelatedProductsCards