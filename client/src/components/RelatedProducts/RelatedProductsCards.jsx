import React, {useState} from 'react';
import RelatedProductsCard from './RelatedProductsCard.jsx'

const RelatedProductsCards = (props) => {

  const slideLeft = () => {
    console.log('slideleft')
    var cardDeck = document.getElementsByClassName("related-card-deck");
    cardDeck.scrollLeft = cardDeck.scrollLeft += 500
  }

  const slideRight = () => {
    console.log('slideright')
    var cardDeck = document.getElementsByClassName("related-card-deck")
    cardDeck.scrollLeft = cardDeck.scrollLeft -= 500
  }



  return(
  <div className="related-cards-container">

  <i className=" goLeft fas fa-chevron-left" onClick={slideLeft}/>
   <div className="related-card-deck">
   {props.relatedProducts.map(item => {
     return(
     <div key={item.id} className="related-card" onClick={props.changeProducts}>
     <RelatedProductsCard
     name={item.name} category={item.category} serial={item.id}
     photo={props.relatedProductsPhotos[item.id]}
     loaded={props.photosLoaded}
     />
     </div>
     )}
    )}
    </div>

     <i className="goRight fas fa-chevron-right" onClick={slideRight}/>

  </div>

  )
}

export default RelatedProductsCards