import React from 'react';
import IndividualReviewThumbnailModal from './IndividualReviewThumbnailModal.jsx';

function IndividualReviewThumbnails(props) {
  return (
    <div className='thumbnail-container'>
      {props.photos.map((photo, index) => {
        return (
          <div key={props.reviewId + index}>
            <img src={photo} width="100" onClick={props.modalClickHandler}/>
            <IndividualReviewThumbnailModal
              modalClickHandler={props.modalClickHandler}
              modalCloseClickHandler={props.modalCloseClickHandler}
            />
          </div>
        )
      })}
    </div>
  )
}

export default IndividualReviewThumbnails;