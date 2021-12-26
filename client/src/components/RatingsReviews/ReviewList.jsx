import React from 'react';
import IndividualReviewTile from './IndividualReviewTile.jsx';

function ReviewList(props) {
  return (
    <div>
      {props.product.allProductRelevantReviews.map((review, index) => <IndividualReviewTile key={index}/>)}
    </div>
  )
}

export default ReviewList;

