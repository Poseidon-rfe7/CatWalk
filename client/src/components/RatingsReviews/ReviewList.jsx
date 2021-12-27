import React from 'react';
import IndividualReviewTile from './IndividualReviewTile.jsx';

function ReviewList(props) {
  return (
    <div>
      {props.product.allProductRelevantReviews.map((review) => <IndividualReviewTile key={review.review_id} review={review} showMoreClickHandler={props.showMoreClickHandler}/>)}
    </div>
  )
}

export default ReviewList;

