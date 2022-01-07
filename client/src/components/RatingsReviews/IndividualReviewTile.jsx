import React from 'react';
import IndividualReviewBody from './IndividualReviewBody.jsx';
import IndividualReviewHelpfulness from './IndividualReviewHelpfulness.jsx';
import FiveStar from '../FiveStar.jsx';

/*
To Use: import and place where you need, just pass down the rating as a prop rating={'rating'}
ex: <FiveStar rating={2.7}/>
*/

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
    <div className='individual-review-main-container'>
      <div className="individual-review-first-row-container">
        <div>
          <FiveStar rating={props.review.rating}/>
        </div>
        <div className="individual-review-reviewer-date-container">
          <p><span className='username-checkmark'>&#10003;</span>{`${props.review.reviewer_name}, ${month} ${day}, ${year}`}</p>
        </div>
      </div>
      <div>
        <div className="individual-review-summary-container">
          <p>{props.review.summary}</p>
        </div>
        <div className="individual-review-body-main-container">
          <IndividualReviewBody
            body={props.review.body}
            photos={props.review.photos}
            reviewId={props.review.review_id}
          />
        </div>
        <div className={props.review.recommend ? 'showEl' : 'hideEl'}>
          <p><span>&#10003;</span> I recommend this product</p>
        </div>
        <div className={`response-container ${props.review.response ? 'showEl' : 'hideEl'}`}>
          <h3 className='response-container-move'>Response from seller:</h3>
          <p className='response-container-move'>{props.review.response}</p>
        </div>
        <div className='helpfulness-container'>
          <IndividualReviewHelpfulness review={props.review} helpfulClickHandler={props.helpfulClickHandler}/>
        </div>
      </div>
    </div>
  )
}

export default IndividualReviewTile;