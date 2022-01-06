import React from 'react';

function StarRating(props) {
  return (
    <div className='star-rating-container row-inner-elements'>
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;

        return (
          <label key={i}>
            <input
              className='star-rating-radio'
              type='radio'
              name='rating'
              value={ratingValue}
              onClick={() => props.starClickHandler(ratingValue)}
            />
            <div>
              <span
              className='star-rating-icon'
                style={{color: ratingValue <= (props.hover || props.rating) ? '#ffc107' : '#ccc'}}
                onMouseEnter={() => props.starMouseEnter(ratingValue)}
                onMouseLeave={props.starMouseLeave}
              ><i className="fas fa-star"></i></span>
            </div>
          </label>
        )
      })}
    </div>
  )
}

export default StarRating;


