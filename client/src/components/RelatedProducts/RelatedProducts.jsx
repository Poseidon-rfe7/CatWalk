import React, { useState, useEffect } from "react";
import RelatedProductsCards from "./RelatedProductsCards.jsx";
import YourOutfitCards from "./YourOutfitCards.jsx";
import CompareModal from "./CompareModal.jsx";

const RelatedProducts = (props) => {
  const [defaultPhotos, setDefaultPhotos] = useState({});
  const [photosLoaded, setPhotosLoaded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [compareInfo, setCompareInfo] = useState([]);

  useEffect(() => {
    let photos = {};
    if (props.relatedProductStyles.length > 0) {
      props.relatedProductStyles.forEach((product) => {
        photos[product.product_id] = product.results[0].photos[0].url;
        product.results.forEach((style, i) => {
          if (style["default?"] === true) {
            let picUrl = style.photos[0];
            photos[product.product_id] = picUrl.url;
          }
        });
      });
      for (var key in photos) {
        if (photos[key] === null) {
          photos[key] =
            "https://i.pinimg.com/originals/74/5c/e5/745ce5086456b8d2520a32ec6fca9888.jpg";
        }
      }
      setDefaultPhotos(photos);
      setPhotosLoaded(true);
    }
  }, [props.relatedProductStyles]);

  const changeProducts = (e) => {
    var id = e.target.getAttribute("serial");
    props.changeProducts(id);
  };

  const starHandler = (current, related) => {
    setCompareInfo([current, related]);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div id="relatedProducts-link" className="related-products-container">
      <div className="relatedproducts-title">Related Products</div>
      <RelatedProductsCards
        modalhandler={starHandler}
        currentProduct={props.currentProduct}
        relatedProducts={props.relatedProducts}
        relatedProductStyles={props.relatedProductStyles}
        relatedProductsIds={props.relatedProductsIds}
        relatedratings={props.relatedratings}
        photosLoaded={photosLoaded}
        relatedProductsPhotos={defaultPhotos}
        changeProducts={changeProducts}
      />

      <CompareModal
        show={showModal}
        closemodal={closeModal}
        compareinfo={compareInfo}
      />

      <div className="youroutfit-title">Your Outfit</div>
      <YourOutfitCards
        currentproductstyles={props.currentproductstyles}
        currentproduct={props.currentProduct}
      />
    </div>
  );
};

export default RelatedProducts;
