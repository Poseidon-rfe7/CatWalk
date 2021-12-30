import React, {useState, useRef, useEffect} from 'react';
import RelatedProductsCard from './RelatedProductsCard.jsx'


const RelatedProductsCards = (props) => {
  const ref = useRef(0)
  // const [scrollPosition, setScrollPosition] = useState(0);
  const [showCards, setShowCards] = useState([])


  useEffect(()=> {
    var cardstates = [];
    for (var i = 0; i < props.relatedProducts.length; i++) {
      if (i < 4) {
        cardstates[i] = true
      }
      if (i >= 4) {
        cardstates[i] = false
      }
    setShowCards(cardstates)
    }
    ref.current.scrollLeft = 0
  }, [props.relatedProducts])

  const goRight = (offset) => {
    ref.current.scrollLeft += offset;
    // setScrollPosition(ref.current.scrollLeft)
    var temp = showCards.slice()
    for (var i = 0; i < showCards.length; i++) {
      if (showCards[i] === true && showCards[i+4] === false) {
        temp[i] = false;
        break;
      }
    }
    for (var i = showCards.length; i > 0; i--) {
      if (showCards[i] === true) {
        temp[i+1] = true;
        break;
      }
    }
    setShowCards(temp)
  }

  const goLeft = (offset) => {
    ref.current.scrollLeft -= offset;
    // setScrollPosition(ref.current.scrollLeft)
    var temp = showCards.slice()
    for (var i = showCards.length; i > 0; i--) {
      if (showCards[i] === true && showCards[i-4] === false) {
        temp[i] = false;
        break;
      }

    }
    for (var i = 0; i < showCards.length; i++) {
      if (showCards[i] === true) {
        temp[i-1] = true;
        break;
      }
    }
    setShowCards(temp)
  }

  const starHandler = (e) => {
    var id = e.target.getAttribute('serial')
    var slot = e.target.getAttribute('slot')
    props.modalhandler(props.currentProduct, props.relatedProducts[slot])

 }


  return(
  <div className="related-cards-container">


   <div className ="scroll-button">
  {showCards[0] === true ? <div className="placeholder"/>
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
      {showCards[showCards.length -1] === true ? <div className="placeholder"/> : <i className="goRight fas fa-chevron-right" onClick={() => goRight(216)}/>
      }

    </div>


  </div>

  )
}

export default RelatedProductsCards