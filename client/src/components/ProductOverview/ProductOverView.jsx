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
      setStyles(props.currentStyles.results);
      setStyle(props.currentStyles.results[0]);
      setSkus(props.currentStyles.results[0].skus);
    }
  }, [props.currentStyles]);

  return (
    <div id="productOverview-link" className="products-overview-container">
      <Grid  >
        <div className="image-and-thumbnails" >
          <ImageGallery styles={styles} currentPhotos={style.photos} />
        </div>

        <div className="info-and-style" key={2}>
          <ProductInformation
            currentProduct={props.currentProduct}
            currentRatings={props.currentRatings}
            stylePrice={style.original_price}
          />
          <StyleSelector
            styles={styles}
            //  changeStyle={changeStyle}
          />

          <AddToCart skus={skus} style={style}></AddToCart>
        </div>
      </Grid>
    </div>
  );
};

export default ProductsOverview;
