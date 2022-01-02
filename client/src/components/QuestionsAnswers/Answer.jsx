import React from 'react';

const Answer = (props) => {
  return (
    <div className='answer'>
      <p className='reset-margins'>{props.answer.body}</p>
      {props.answer.photos.length && props.answer.photos.map((photo) => {
        return <img src={photo.url} key={photo.id} className='photos-thumbnail' />
      })}
      <div className='qa-helpful a-helpful'>
        by {props.answer.answerer_name}, {props.answer.date} | Helpful?
        <button className='qa-button helpful-button'>Yes ({props.answer.helpfulness})</button>
        |
        <button className='qa-button helpful-button'>Report</button>
      </div>
    </div>
  )
};

export default Answer;