import React, { useState, useRef, useEffect } from "react";
import AddToOutfit from "./AddToOutfit.jsx";
import OutfitCard from "./OutfitCard.jsx";

const YourOutfitCards = ({currentproduct, currentproductstyles}) => {
  const [parseStorage, setParseStorage] = useState([]);
  const [updateCards, setUpdateCards] = useState(false);
  const [trigger, setTrigger] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);
  const activeSlideRef = useRef(null);
  const [hideLeft, setHideLeft] = useState(true);
  const [hideRight, setHideRight] = useState(false);

  useEffect(() => {
    var temp = [];
    if (window.localStorage["yourOutfits"] !== undefined) {
      let outfits = JSON.parse(window.localStorage.getItem("yourOutfits"));
      for (var key in outfits) {
        temp.push(outfits[key]);
      }
    }
    setParseStorage(temp);
    setUpdateCards(true);
  }, [trigger]);

  const triggerRender = () => {
    var random = Math.random() * 10;
    setTrigger(random);
  };

  useEffect(() => {
    setActiveSlide(0);
  }, [parseStorage]);

  useEffect(() => {
    if (activeSlideRef.current) {
      activeSlideRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "nearest",
      });
    }

    if (activeSlide === 0) {
      setHideLeft(true);
    } else {
      setHideLeft(false);
    }
    if (activeSlide === parseStorage.length - 1) {
      setHideRight(true);
    } else {
      setHideRight(false);
    }
  }, [activeSlide]);

  const moveLeft = Math.max(0, activeSlide - 1);
  const moveRight = Math.min(parseStorage.length - 1, activeSlide + 1);

  return (
    <div className="your-outfit-container">
      <div className="scroll-button">
        {hideLeft ? (
          <div className="placeholder" />
        ) : (
          <i
            className=" goLeft fas fa-chevron-left"
            onClick={() => setActiveSlide(moveLeft)}
          />
        )}
      </div>

      <div id="youroutfitdeck" className="your-outfit-deck">
        <div className="your-outfit-card">
          <AddToOutfit
            currentproduct={currentproduct}
            currentproductstyles={currentproductstyles}
            trigger={triggerRender}
          />
        </div>

        {updateCards ? (
          parseStorage.map((outfit, i) => {
            const active = i === activeSlide;
            return (
              <div
                className={`your-outfit-card slide ${
                  active ? "active" : "deactive"
                }`}
                key={outfit.id}
                ref={active ? activeSlideRef : null}
                id={`slide-${i}`}
              >
                <OutfitCard
                  id={outfit.id}
                  name={outfit.name}
                  active={i === activeSlide ? true : false}
                  photo={outfit.url}
                  category={outfit.category}
                  trigger={triggerRender}
                />
              </div>
            );
          })
        ) : (
          <div />
        )}
      </div>

      <div className="scroll-button">
        {hideRight ? (
          <div className="placeholder" />
        ) : (
          <i
            className="goRight fas fa-chevron-right"
            onClick={() => setActiveSlide(moveRight)}
          />
        )}
      </div>
    </div>
  );
};

export default YourOutfitCards;
