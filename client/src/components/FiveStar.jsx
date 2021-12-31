import React, {useState, useEffect} from 'react'

const FiveStar = ({rating}) => {
  const [star, setStar] = useState([]);

  useEffect(()=> {
  const percent = `${(rating / 5) * 100}%`;
  setStar(percent)
  
  }, [])


  return (
      <div className="stars-outer">
        <div className="stars-inner" style={{width: star}}/>
      </div>
  )



}

export default FiveStar