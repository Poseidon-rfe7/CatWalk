import React, { useState, useEffect } from "react";
import FiveStar from "../FiveStar.jsx";

const RelatedProductsCard = ({serial, changeproduct, loaded, photo, active, starhandler, slot, category, name, rating}) => (
  <div className="product-card-contents">
    <div
      className="product-image"
      serial={serial}
      onClick={changeproduct}
    >
      {loaded ? (
        <img
          className={`fit-picture ${
            active ? "active-pic" : "deactive-pic"
          }`}
          src={photo}
          alt="product image"
          serial={serial}
          onClick={changeproduct}
        />
      ) : (
        <div>Loading...</div>
      )}
    </div>

    <i
      id="related-action"
      className="related-action far fa-star"
      onClick={starhandler}
      serial={serial}
      slot={slot}
    />

    <div
      className="product-info"
      serial={serial}
      onClick={changeproduct}
    >
      {name}
      <br />
      <div className="style-tag">style: {category}</div>
      <div className="card-5star">
        <FiveStar rating={rating} />
      </div>
    </div>
  </div>
);

export default RelatedProductsCard;
