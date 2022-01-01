import React, {useState, useEffect} from 'react'

const FiveStar = ({rating}) => {
  const [star, setStar] = useState(0);

  useEffect(()=> {
  const percent = (rating / 5) * 100;
  setStar(percent)
  }, [rating])

  return (
    <div className="stars-container">
      <div className="stars-outer">
        <div className="stars-inner" style={{width: `${star}%`}}/>
      </div>
      </div>
  )

}

export default FiveStar

/*
To Use: import and place where you need, just pass down the rating as a prop rating={'rating'}
ex: <FiveStar rating={2.7}/>
*/