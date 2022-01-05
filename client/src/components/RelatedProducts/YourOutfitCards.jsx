import React, { useState, useRef, useEffect } from "react";
import AddToOutfit from "./AddToOutfit.jsx";
import OutfitCard from "./OutfitCard.jsx";

const useInstance = (instance = {}) => {
  const ref = useRef(instance);
  return ref.current;
};

const YourOutfitCards = (props) => {
  const [parseStorage, setParseStorage] = useState([]);
  const [updateCards, setUpdateCards] = useState(false);
  const [trigger, setTrigger] = useState(0);

  const [activeSlide, setActiveSlide] = useState(0);
  const activeSlideRef = useRef(null);
  const inst = useInstance({ first: true });
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
    // *** After render, don't do anything, just remember we've seen the render
    if (inst.first) {
      inst.first = false;
    } else if (activeSlideRef.current) {
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
            currentproduct={props.currentproduct}
            currentproductstyles={props.currentproductstyles}
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
