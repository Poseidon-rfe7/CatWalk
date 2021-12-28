import React, {useState, useEffect} from 'react';
import RelatedProductsCards from './RelatedProductsCards.jsx';
import YourOutfitCards from './YourOutfitCards.jsx'

const RelatedProducts = (props) => {
  const [defaultPhotos, setDefaultPhotos] = useState({});
  const [photosLoaded, setPhotosLoaded] = useState(false)
  const [currentPhotoUrl, setCurrentPhotoUrl] = useState('');

   useEffect(()=>{
    let photos={};
    if (props.relatedProductStyles.length > 0) {
      props.relatedProductStyles.forEach(product => {
        photos[product.product_id] = product.results[0].photos[0].url;
        product.results.forEach((style, i) => {
          if (style['default?'] === true) {
            let picUrl = style.photos[0]
            photos[product.product_id] = picUrl.url;
          }
        })
      })
    setDefaultPhotos(photos);
    setPhotosLoaded(true);
    }
   }, [props.relatedProductStyles])

   const changeProducts = (e) => {
     var id = e.target.getAttribute('serial')
     props.changeProducts(id)
   }

  return(
  <div className="related-products-container">

    <div className="relatedproducts-title">Related Products</div>
    <RelatedProductsCards
    currentProduct={props.currentProduct}
    relatedProducts={props.relatedProducts}
    relatedProductStyles={props.relatedProductStyles}
    relatedProductsIds={props.relatedProductsIds}
    photosLoaded={photosLoaded}
    relatedProductsPhotos={defaultPhotos}
    changeProducts={changeProducts}
    />

    <div className="youroutfit-title">Your Outfit</div>
    <YourOutfitCards
     currentproductstyles={props.currentproductstyles} currentproduct={props.currentProduct}
    />

  </div>
  )
  }

export default RelatedProducts
