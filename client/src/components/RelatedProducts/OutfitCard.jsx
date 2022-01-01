import React from 'react'

const OutfitCard = (props) => {
  const outfitStorage = window.localStorage;

  const removeFromOutfits = () => {
    var parsed = JSON.parse(outfitStorage.getItem('yourOutfits'))
    console.log(parsed, props.id)
    delete parsed[props.id]
    outfitStorage.setItem('yourOutfits', JSON.stringify(parsed))
    props.trigger()
  }


  return (
    <div className="outfit-card-contents">

     <i id="outfit-action" className="outfit-action fas fa-times" onClick={removeFromOutfits} />


    <div className="product-image" >
    <img className="fit-picture" src={props.photo} alt="product image"/>
    </div>
    <div className="product-info">
      {props.name}
      <br/>
      <div className="style-tag">
      style: {props.category}
      </div>
    </div>

  </div>
  )
}

export default OutfitCard