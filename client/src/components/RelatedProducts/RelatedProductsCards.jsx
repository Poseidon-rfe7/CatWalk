import React, { useState, useRef, useEffect } from "react";
import RelatedProductsCard from "./RelatedProductsCard.jsx";

const useInstance = (instance = {}) => {
  const ref = useRef(instance);
  return ref.current;
};

const RelatedProductsCards = (props) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const activeSlideRef = useRef(null);
  const inst = useInstance({ first: true });
  const [hideLeft, setHideLeft] = useState(true);
  const [hideRight, setHideRight] = useState(false);

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
    console.log(activeSlide);
    if (activeSlide === 0) {
      setHideLeft(true);
    } else {
      setHideLeft(false);
    }
    if (activeSlide === props.relatedProducts.length - 1) {
      setHideRight(true);
    } else {
      setHideRight(false);
    }
  }, [activeSlide]);

  const moveLeft = Math.max(0, activeSlide - 1);
  const moveRight = Math.min(props.relatedProducts.length - 1, activeSlide + 1);

  // const goRight = (offset) => {
  //   ref.current.scrollLeft += offset;
  //   setScrollPosition(ref.current.scrollLeft);

  // };

  // const goLeft = (offset) => {
  //   ref.current.scrollLeft -= offset;
  //   setScrollPosition(ref.current.scrollLeft);
  // };

  const starHandler = (e) => {
    var id = e.target.getAttribute("serial");
    var slot = e.target.getAttribute("slot");
    props.modalhandler(props.currentProduct, props.relatedProducts[slot]);
  };

  return (
    <div className="related-cards-container">
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

      <div id="cardDeck" className="related-card-deck">
        {props.relatedProducts.map((item, i) => {
          const active = i === activeSlide;
          return (
            <div
              key={item.id}
              className={`related-card slide ${active ? "active" : "deactive"}`}
              ref={active ? activeSlideRef : null}
              id={`slide-${i}`}
              key={`slide-${i}`}
            >
              <RelatedProductsCard
                name={item.name}
                category={item.category}
                serial={item.id}
                slot={i}
                photo={props.relatedProductsPhotos[item.id]}
                loaded={props.photosLoaded}
                starhandler={starHandler}
                rating={props.relatedratings[item.id]}
                changeproduct={props.changeProducts}
              />
            </div>
          );
        })}
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

export default RelatedProductsCards;
