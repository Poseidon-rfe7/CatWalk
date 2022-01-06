import React, { useEffect, useState } from "react";

const AddToOutfit = (props) => {
  const [currentPhoto, setCurrentPhoto] = useState("");

  useEffect(() => {
    if (props.currentproductstyles.results) {
      const styles = props.currentproductstyles.results;
      for (var i = 0; i < styles.length; i++) {
        if (styles[i]["default?"] === true) {
          setCurrentPhoto(styles[i].photos[0].url);
          return;
        }
      }
      setCurrentPhoto(styles[0].photos[0].url);
    }
  }, [props.currentproductstyles]);

  const addToOutfits = () => {
    var currentStored = window.localStorage.getItem("yourOutfits");
    currentStored = JSON.parse(currentStored);
    if (currentStored === null) {
      currentStored = {};
    }

    var toStore = {
      url: currentPhoto || "https://i.pinimg.com/originals/74/5c/e5/745ce5086456b8d2520a32ec6fca9888.jpg",
      name: props.currentproduct.name,
      category: props.currentproduct.category,
      id: props.currentproduct.id,
    };

    currentStored[props.currentproduct.id] = toStore;

    window.localStorage.setItem("yourOutfits", JSON.stringify(currentStored));
    props.trigger();
  };

  return (
    <div className="add-to-outfit-card">
      <div>
        <i
          id="add-to-outfit-button"
          className="fas fa-plus"
          onClick={addToOutfits}
        />
      </div>

      <div className="product-info add-info">
        Add This Item
        {<br></br>}
        To Your Outfit!
      </div>
    </div>
  );
};

export default AddToOutfit;
