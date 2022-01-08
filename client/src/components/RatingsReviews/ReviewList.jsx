import React from "react";
import IndividualReviewTile from "./IndividualReviewTile.jsx";

function ReviewList(props) {
  let filteredReviews;
  if (props.filters.length > 0) {
    let reviews = props.product.filter((review) =>
      props.filters.includes(review.rating.toString())
    );
    filteredReviews = reviews;
  } else {
    filteredReviews = props.product;
  }

  return (
    <div className='review-list-scroll'>
      <div>
        {filteredReviews.map((review) => (
          <IndividualReviewTile
            key={review.review_id}
            review={review}
            helpfulClickHandler={props.helpfulClickHandler}
          />
        ))}
      </div>
    </div>
  );
}

export default ReviewList;
