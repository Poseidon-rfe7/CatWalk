import React from 'react';
import IndividualReviewTile from './IndividualReviewTile.jsx';

function ReviewList(props) {
  return (
    <div className='review-list-scroll'>
      <div>
      {props.product.map((review) => <IndividualReviewTile key={review.review_id} review={review} helpfulClickHandler={props.helpfulClickHandler}/>)}
      </div>
    </div>
  )
}

export default ReviewList;

