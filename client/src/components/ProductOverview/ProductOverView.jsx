import React, {useState, useEffect} from 'react';
import ProductInformation from './ProductInformation.jsx'
import StyleSelector from './StyleSelector.jsx'
import AddToCart from './AddToCart.jsx'
import ImageGallery from './ImageGallery.jsx'
import Grid  from './Grid.jsx'


const ProductsOverview = (props) => {


  const [styles, setStyles] = useState([]);
  const [style, setStyle] = useState([]);
  const [skus, setSkus] = useState({});

  useEffect(() => {
    if (props.currentStyles.results) {
      setStyles(props.currentStyles.results)
      setStyle(props.currentStyles.results[0]);
      setSkus(props.currentStyles.results[0].skus)
    }
  }, [props.currentStyles])

  return (
    <div className='products-overview-container'>

      <Grid>
        <ImageGallery

          styles={styles}
          currentPhotos={style.photos}
        />
        <ProductInformation
          currentProduct={props.currentProduct}
          currentRatings={props.currentRatings}
          stylePrice={style.original_price} />


        <StyleSelector
          styles={styles}
        //  changeStyle={changeStyle}
        />
        <AddToCart
          skus={skus}
          style={style}>

        </AddToCart>

      </Grid>


    </div>
  )
}


export default ProductsOverview
