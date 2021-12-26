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
    console.log(e)

  }

  return(
  <div className="related-cards-container">
  {scrollPosition === 0 ? <div/>
  : <i className=" goLeft fas fa-chevron-left" onClick={() => goLeft(170)} />
  }

   <div id={"cardDeck"} className="related-card-deck" ref={ref}>



   {props.relatedProducts.map(item => {
     return(
     <div key={item.id} className="related-card">
     <RelatedProductsCard
     name={item.name} category={item.category} serial={item.id}
     photo={props.relatedProductsPhotos[item.id]}
     loaded={props.photosLoaded} starhandler={starHandler}
     changeproduct={props.changeProducts}
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