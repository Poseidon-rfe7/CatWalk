import React from 'react'

const AddToOutfit = (props) => {

  return (
    <div className="add-to-outfit-card your-outfit-card">
      <div>
      <i id="add-to-outfit-button" className="fas fa-plus" onClick={props.handleadd}/>
      </div>

      <div className="product-info">
      Add Current Item To Your Outfit!
      </div>
    </div>
  )
}

export default AddToOutfit