import React, { useState, useRef, useEffect } from "react";
import RelatedProductsCard from "./RelatedProductsCard.jsx";

const RelatedProductsCards = ({relatedProducts, modalhandler, currentProduct, relatedProductStyles, relatedProductsIds, relatedratings, photosLoaded, relatedProductsPhotos, changeProducts}) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const activeSlideRef = useRef(null);
  const containerRef = useRef(null)
  const [hideLeft, setHideLeft] = useState(true);
  const [hideRight, setHideRight] = useState(false);

  useEffect(() => {
    setActiveSlide(0);
  }, [relatedProducts]);

  useEffect(() => {
    if (activeSlideRef.current) {
      activeSlideRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "nearest",
      });
    }

    if (activeSlide === 0) {
      containerRef.current.scrollLeft = 0
      setHideLeft(true);
    } else {
      setHideLeft(false);
    }
    if (activeSlide === relatedProducts.length - 1) {
      containerRef.current.scrollLeft = containerRef.current.scrollWidth
      setHideRight(true);
    } else {
      setHideRight(false);
    }
  }, [activeSlide]);

  const moveLeft = activeSlide - 1;
  const moveRight = activeSlide + 1;

  const starHandler = (e) => {
    var id = e.target.getAttribute("serial");
    var slot = e.target.getAttribute("slot");
    modalhandler(currentProduct, relatedProducts[slot]);
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

      <div id="cardDeck" className="related-card-deck" ref={containerRef}>
        {relatedProducts.map((item, i) => {
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
                photo={relatedProductsPhotos[item.id]}
                loaded={photosLoaded}
                starhandler={starHandler}
                rating={relatedratings[item.id]}
                changeproduct={changeProducts}
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
