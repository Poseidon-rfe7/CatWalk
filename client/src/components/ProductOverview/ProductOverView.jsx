import React, { useState, useEffect } from "react";
import ProductInformation from "./ProductInformation.jsx";
import StyleSelector from "./StyleSelector.jsx";
import AddToCart from "./AddToCart.jsx";
import ImageGallery from "./ImageGallery.jsx";
import Grid from "./Grid.jsx";

const ProductsOverview = (props) => {
  const [styles, setStyles] = useState([]);
  const [style, setStyle] = useState([]);
  const [skus, setSkus] = useState({});

  useEffect(() => {
    if (props.currentStyles.results) {
      setStyles(props.currentStyles.results); // Set array of styles
      setStyle(props.currentStyles.results[0]); // Set currently selected style
      setSkus(props.currentStyles.results[0].skus); // Set currently selected style's skus
    }
  }, [props.currentStyles]);

  return (
    <div id="productOverview-link" className="products-overview-container module-parent">
      <Grid  >
        <div className="image-and-thumbnails" >
          <ImageGallery
          styles={styles}
          currentPhotos={style.photos}
          styleName={style.name}
          />
        </div>

        <div className="info-and-style" key={2}>
          <ProductInformation
            currentProduct={props.currentProduct}
            currentRatings={props.currentRatings}
            stylePrice={style.original_price}
          />

          <StyleSelector
            currentPhotos={style.photos}
            styles={styles}
            setStyle={setStyle}
            styleName={style.name}
          />

          <AddToCart
          skus={skus}
          style={style}>
          </AddToCart>
        </div>
      </Grid>
    </div>
  );
};

export default ProductsOverview;
