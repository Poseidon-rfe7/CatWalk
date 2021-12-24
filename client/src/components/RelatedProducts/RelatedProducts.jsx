import React from 'react';
import RelatedProductsCards from './RelatedProductsCards.jsx';
import YourOutfitCards from './YourOutfitCards.jsx'

const RelatedProducts = (props) => (
  <div>
    <div className="relatedproducts-title">
    Related Products
    </div>

    <RelatedProductsCards
    currentProduct={props.currentProduct}
    relatedProducts={props.relatedProducts}
    relatedProductStyles={props.relatedProductStyles}
    relatedProductsIds={props.relatedProductsIds}
    />
    <div className="youroutfit-title">Your Outfit</div>
    <YourOutfitCards/>
  </div>

)

export default RelatedProducts
