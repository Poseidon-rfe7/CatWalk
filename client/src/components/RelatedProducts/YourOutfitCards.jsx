import React, {useState, useRef, useEffect} from 'react';
import AddToOutfit from './AddToOutfit.jsx'
import OutfitCard from './OutfitCard.jsx'

const YourOutfitCards = (props) => {
  const outfitStorage = window.localStorage;
  const [parseStorage, setParseStorage] = useState([])
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showCards, setShowCards] = useState([])
  const ref = useRef(0)
  const [updateCards, setUpdateCards] = useState(false)
  const [trigger, setTrigger] = useState(0)

  useEffect(() => {
    var temp = []
    if (outfitStorage.length > 0){
      for (var key in outfitStorage) {
        if (typeof outfitStorage[key] === 'string' ){
          temp.push( JSON.parse(outfitStorage[key]))
        }
      }
    }
    setParseStorage(temp)
    setUpdateCards(true)
  },[trigger])

  useEffect(()=> {
    var cardstates = [];
    for (var i = 0; i < parseStorage.length; i++) {
      if (i < 3) {
        cardstates[i] = true
      }
      if (i >= 3) {
        cardstates[i] = false
      }
    setShowCards([true].concat(cardstates))
    }
    if(parseStorage.length=== 0) {
      setShowCards([true])
    }
  }, [parseStorage])

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

  const triggerRender = () => {
    var random = Math.random() * 10
    setTrigger(random)
  }

  return(
  <div className="your-outfit-container">

  <div className ="scroll-button">
  {showCards[0] === true ? <div className="placeholder"/>
  : <i className=" goLeft fas fa-chevron-left" onClick={() => goLeft(216)} />
  }
  </div>

  <div id="youroutfitdeck" className="your-outfit-deck" ref={ref}>
   <div className="your-outfit-card" >

  <AddToOutfit currentproduct={props.currentproduct} currentproductstyles={props.currentproductstyles} trigger={triggerRender}/>
   </div>

  {updateCards ?
  parseStorage.map(outfit => {
    return(
    <div className="your-outfit-card" key={outfit.id} >
    <OutfitCard id={outfit.id} name={outfit.name} photo={outfit.url} category={outfit.category} trigger={triggerRender}/>
    </div>
    )
  })
  : <div/>
}


  </div>

  <div className ="scroll-button">
      {showCards[showCards.length -1] === true ? <div className="placeholder"/> : <i className="goRight fas fa-chevron-right" onClick={() => goRight(216)}/>
      }
      </div>

  </div>
  )
}

export default YourOutfitCards