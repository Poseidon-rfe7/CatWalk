import React from "react";

const OutfitCard = ({id, trigger, active, photo, name, category}) => {
  const outfitStorage = window.localStorage;

  const removeFromOutfits = () => {
    var parsed = JSON.parse(outfitStorage.getItem("yourOutfits"));
    console.log(parsed, id);
    delete parsed[id];
    outfitStorage.setItem("yourOutfits", JSON.stringify(parsed));
    trigger();
  };

  return (
    <div className="outfit-card-contents">
      <div className="product-image">
        <img
          className={`fit-picture ${
            active ? "active-pic" : "deactive-pic"
          }`}
          src={photo}
          alt="product image"
        />
      </div>

      <i
        id="outfit-action"
        className="outfit-action fas fa-times"
        onClick={removeFromOutfits}
      />

      <div className="product-info">
        {name}
        <br />
        <div className="style-tag">style: {category}</div>
      </div>
    </div>
  );
};

export default OutfitCard;
