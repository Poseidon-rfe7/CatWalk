import React, {useState} from 'react';
import RelatedProductsCard from './RelatedProductsCard.jsx'

const RelatedProductsCards = (props) => {

  const slideLeft = () => {
    var button = document.getElementById("goLeft");
    button.scrollLeft = button.scrollLeft + 500
  }

  const slideRight = () => {
    var button = document.getElementById("goRight")
    button.scrollLeft = button.scrollLeft - 500
  }



  return(
  <div className="related-cards-container">

  <i id="goLeft" className="fas fa-chevron-left" onClick={slideLeft}/>

   {props.relatedProducts.map(item => {
     return(
     <div key={item.id} className="related-card">
     <RelatedProductsCard name={item.name} category={item.category}
     photo={props.relatedProductsPhotos[item.id]}
     loaded={props.photosLoaded}
     />
     </div>
     )}
    )}


     <i id="goRight" className="fas fa-chevron-right" onClick={slideRight}/>

  </div>

  )
}

export default RelatedProductsCards