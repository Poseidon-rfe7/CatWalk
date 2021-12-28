import React, {useState, useRef, useEffect} from 'react';
import AddToOutfit from './AddToOutfit.jsx'

const YourOutfitCards = (props) => {
  const outfitStorage = window.localStorage;
  const ref = useRef(0)
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showCards, setShowCards] = useState([])

  useEffect(()=> {
    var cardstates = [];
    for (var i = 0; i < outfitStorage.length; i++) {
      if (i < 4) {
        cardstates[i] = true
      }
      if (i >= 4) {
        cardstates[i] = false
      }
    setShowCards(cardstates)
    }
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



  return(
  <div className="your-outfit-container">

  <div className ="scroll-button">
  {showCards[0] === true ? <div className="placeholder"/>
  : <i className=" goLeft fas fa-chevron-left" onClick={() => goLeft(216)} />
  }
  </div>

  <div id="youroutfitdeck" className="your-outfit-deck" ref={ref}>
  <AddToOutfit currentproduct={props.currentproduct} currentproductstyles={props.currentproductstyles}/>

  </div>



  <div className ="scroll-button">
      {showCards[showCards.length -1] === true ? <div className="placeholder"/> : <i className="goRight fas fa-chevron-right" onClick={() => goRight(216)}/>
      }
      </div>

  </div>
  )
}

export default YourOutfitCards