import React, { useEffect, useState } from "react";

const AddToOutfit = ({currentproductstyles, currentproduct, trigger }) => {
  const [currentPhoto, setCurrentPhoto] = useState("");

  useEffect(() => {
    if (currentproductstyles.results) {
      const styles = currentproductstyles.results;
      for (var i = 0; i < styles.length; i++) {
        if (styles[i]["default?"] === true) {
          setCurrentPhoto(styles[i].photos[0].url);
          return;
        }
      }
      setCurrentPhoto(styles[0].photos[0].url);
    }
  }, [currentproductstyles]);

  const addToOutfits = () => {
    var currentStored = window.localStorage.getItem("yourOutfits");
    currentStored = JSON.parse(currentStored);
    if (currentStored === null) {
      currentStored = {};
    }

    var toStore = {
      url: currentPhoto || "https://i.pinimg.com/originals/74/5c/e5/745ce5086456b8d2520a32ec6fca9888.jpg",
      name: currentproduct.name,
      category: currentproduct.category,
      id: currentproduct.id,
    };

    currentStored[currentproduct.id] = toStore;

    window.localStorage.setItem("yourOutfits", JSON.stringify(currentStored));
    trigger();
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
