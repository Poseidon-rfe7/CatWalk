import React from 'react';
import RelatedProductsCards from './RelatedProductsCards.jsx';
import YourOutfitCards from './YourOutfitCards.jsx'

const RelatedProducts = (props) => (
  <div>
    <RelatedProductsCards
    currentProduct={props.currentProduct}
    relatedProducts={props.relatedProducts}
    relatedProductStyles={props.relatedProductStyles}
    relatedProductsIds={props.relatedProductsIds}
    />
    <YourOutfitCards/>
  </div>

)

export default RelatedProducts
