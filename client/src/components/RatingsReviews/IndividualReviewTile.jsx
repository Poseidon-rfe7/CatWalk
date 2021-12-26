import React from 'react';

function IndividualReviewTile(props) {
  return (
    <div>
      <div className="individual-review-first-row-container">
        <div>
          <p>star rating component</p>
        </div>
        <div className="individual-review-reviewer-date-container">
          <p>reviewer_name, date</p>
        </div>
      </div>

      <div>
        <div>
          <p>summary</p>
        </div>
        <div>
          <p>body</p>
        </div>
        <div>
          <p>recommend</p>
        </div>
        <div>
          <p>response</p>
        </div>
        <div>
          <p>helpfulness</p>
        </div>

      </div>
    </div>
  )
}

export default IndividualReviewTile;