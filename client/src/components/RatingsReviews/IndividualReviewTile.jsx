import React from 'react';
import IndividualReviewBody from './IndividualReviewBody.jsx';

function IndividualReviewTile(props) {
  let months = {
    '01': 'January',
    '02': 'February',
    '03': 'March',
    '04': 'April',
    '05': 'May',
    '06': 'June',
    '07': 'July',
    '08': 'August',
    '09': 'September',
    '10': 'October',
    '11': 'November',
    '12': 'December',
  };

  let timeArr = props.review.date.split('T')[0].split('-');
  let month = months[timeArr[1]];
  let day = timeArr[2];
  let year = timeArr[0];
  let currentSummary = props.review.summary;


  return (
    <div>
      <div className="individual-review-first-row-container">
        <div>
          <p>star rating component</p>
        </div>
        <div className="individual-review-reviewer-date-container">
          <p>{`${props.review.reviewer_name}, ${month} ${day}, ${year}`}</p>
        </div>
      </div>
      <div>
        <div className="individual-review-summary-container">
          <p>{props.review.summary}</p>
        </div>
        <div>
          <IndividualReviewBody body={props.review.body} showMoreClickHandler={props.showMoreClickHandler}/>
        </div>
        <div>
          <p>{props.review.recommend}</p>
        </div>
        <div>
          <p>{props.review.response}</p>
        </div>
        <div>
          <p>{props.review.helpfulness}</p>
        </div>
      </div>
    </div>
  )
}

export default IndividualReviewTile;