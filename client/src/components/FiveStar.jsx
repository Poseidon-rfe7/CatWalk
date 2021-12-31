import React, {useState, useEffect} from 'react'

const FiveStar = ({rating}) => {
  const [stars, setStars] = useState([]);

  useEffect(()=> {

    let whole = Math.floor(rating);
    let dec = parseFloat((rating - whole).toFixed(1));
    let emptyStar = <i className="single-star far fa-star"/>
    let fullStar = <i className="single-star single-star-fill far fa-star"/>
    let halfStar = <i className="single-star single-star-50 far fa-star"/>
    let quarterStar = <i className="single-star single-star-25 far fa-star"/>
    let threeQuarterStar = <i className="single-star single-star-75 far fa-star"/>

   
    let temp = [];
    while(whole > 0) {
      temp.push(fullStar)
      whole --;
    }
    if (dec > 0) {
      if (dec >= .75) {
        temp.push(threeQuarterStar)
      } else if (dec >= .50) {
        temp.push(halfStar)
      } else {
        temp.push(quarterStar)
      }
    }
    while (temp.length < 5) {
      temp.push(emptyStar)
    }

    setStars(temp)

  }, [])



  return (
    <div className="star-container">
    {stars.map((star, i) => {
      return <div className="star-container" key={i} >{star}</div>
    })}
    </div>
  )
}

export default FiveStar