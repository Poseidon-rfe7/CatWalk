import React, {useState, useRef, useEffect} from 'react';
import RelatedProductsCard from './RelatedProductsCard.jsx'

const RelatedProductsCards = (props) => {
  const ref = useRef(0)
  const [scrollPosition, setScrollPosition] = useState(0);
  const [hideRight, setHideRight] = useState(false)

  const goRight = (offset) => {
    ref.current.scrollLeft += offset;
    setScrollPosition(ref.current.scrollLeft)
  }

  const goLeft = (offset) => {
    ref.current.scrollLeft -= offset;
    setScrollPosition(ref.current.scrollLeft)
  }

   const starHandler = (e) => {
     var id = e.target.getAttribute('serial')
     var slot = e.target.getAttribute('slot')

     console.log('current:',props.currentProduct)
     console.log('tocomapre:',props.relatedProducts[slot])
  }

  return(
  <div className="related-cards-container">

   <div className ="scroll-button">
  {scrollPosition === 0 ? <div className="placeholder"/>
  : <i className=" goLeft fas fa-chevron-left" onClick={() => goLeft(216)} />
  }
  </div>

   <div id="cardDeck" className="related-card-deck" ref={ref}>
   {props.relatedProducts.map((item, i) => {
     return(
     <div key={item.id} className="related-card">
     <RelatedProductsCard
     name={item.name} category={item.category} serial={item.id} slot={i}
     photo={props.relatedProductsPhotos[item.id]}
     loaded={props.photosLoaded} starhandler={starHandler}
     changeproduct={props.changeProducts}
     />
     </div>
     )}
    )}
    </div>

    <div className ="scroll-button">
   <i className="goRight fas fa-chevron-right" onClick={() => goRight(216)}/>
    </div>


  </div>

  )
}

export default RelatedProductsCards