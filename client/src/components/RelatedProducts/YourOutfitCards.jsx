import React, {useState, useRef} from 'react';
import AddToOutfit from './AddToOutfit.jsx'

const YourOutfitCards = (props) => {
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

  const handleAddToOutfits = (e) => {
    console.log('do somthing ')
  }

  return(
  <div className="your-outfit-container">

    {scrollPosition === 0 ? <div className="placeholder"/>
  : <i className=" goLeft fas fa-chevron-left" onClick={() => goLeft(170)} />
  }

  <div id="youroutfitdeck" className="your-outfit-deck" ref={ref}>
  youroutfitdeck
  <AddToOutfit handleadd={handleAddToOutfits}/>

  </div>



  <i className="goRight fas fa-chevron-right" onClick={() => goRight(170)}/>

  </div>
  )
}

export default YourOutfitCards