import React, {useState, useRef} from 'react';
import RelatedProductsCard from './RelatedProductsCard.jsx'

const RelatedProductsCards = (props) => {
  const ref= useRef(null)
  const goRight = (offset) => {
    ref.current.scrollLeft += offset;
  }
  const goLeft = (offset) => {
    ref.current.scrollLeft -= offset;
  }

  return(
  <div className="related-cards-container">

  <i className=" goLeft fas fa-chevron-left" onClick={() => goLeft(170)}/>

   <div className="related-card-deck" ref={ref}>
   {props.relatedProducts.map(item => {
     return(
     <div key={item.id} className="related-card"
     onClick={props.changeProducts}
     >
     <RelatedProductsCard
     name={item.name} category={item.category} serial={item.id}
     photo={props.relatedProductsPhotos[item.id]}
     loaded={props.photosLoaded}
     />
     </div>
     )}
    )}


    </div>

     <i className="goRight fas fa-chevron-right" onClick={() => goRight(170)}/>
  </div>

  )
}

export default RelatedProductsCards