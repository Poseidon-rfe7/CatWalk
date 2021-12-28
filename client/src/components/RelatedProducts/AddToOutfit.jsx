import React, {useEffect, useState} from 'react'

const AddToOutfit = (props) => {
  const outfitStorage = window.localStorage;
  const [currentPhoto, setCurrentPhoto] = useState('')

  useEffect(()=>{
      if (props.currentproductstyles.results) {
        const styles = props.currentproductstyles.results
        for ( var i = 0; i < styles.length; i++) {
          if ( styles[i]['default?'] === true) {
            setCurrentPhoto(styles[i].photos[0].url);
            return
      }
    }
      setCurrentPhoto(styles[0].photos[0].url)}


  }, [props.currentproductstyles])

  const addToOutfits = () => {
    outfitStorage.setItem(props.currentproduct.id, JSON.stringify({'url': currentPhoto }))
    console.log(outfitStorage)
  }


  return (
    <div className="add-to-outfit-card your-outfit-card">
      <div>
      <i id="add-to-outfit-button" className="fas fa-plus" onClick={addToOutfits}/>
      </div>

      <div className="product-info">
      Add Current Item To Your Outfit!
      </div>
    </div>
  )
}

export default AddToOutfit