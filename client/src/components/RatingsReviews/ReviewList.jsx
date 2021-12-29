import React from 'react';
import IndividualReviewTile from './IndividualReviewTile.jsx';

function ReviewList(props) {
  return (
    <div>
      {props.product.map((review) => <IndividualReviewTile key={review.review_id} review={review} />)}
    </div>
  )
}

export default ReviewList;

