import React from 'react';

function IndividualReviewThumbnailModal(props) {
  return (
    <div
      id='modal'
      className='modal modalOff'
      onClick={props.modalCloseClickHandler}
    >
      <span
        id='modal-close'
        className='close'
        onClick={props.modalCloseClickHandler}
      >
        &times;
      </span>
      <img id='modal-image' className='modal-content' src='' />
    </div>
  );
}

export default IndividualReviewThumbnailModal;
