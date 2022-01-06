import React, { useState, useRef, useEffect } from "react";
import RelatedProductsCard from "./RelatedProductsCard.jsx";

const RelatedProductsCards = (props) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const activeSlideRef = useRef(null);
  const [hideLeft, setHideLeft] = useState(true);
  const [hideRight, setHideRight] = useState(false);

  useEffect(() => {
    setActiveSlide(0);
  }, [props.relatedProducts]);

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
    if (activeSlide === props.relatedProducts.length - 1) {
      setHideRight(true);
    } else {
      setHideRight(false);
    }
  }, [activeSlide]);

  const moveLeft = activeSlide - 1
  const moveRight =  activeSlide + 1

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
            >
              <RelatedProductsCard
                name={item.name}
                category={item.category}
                serial={item.id}
                slot={i}
                active={i === activeSlide ? true : false}
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
