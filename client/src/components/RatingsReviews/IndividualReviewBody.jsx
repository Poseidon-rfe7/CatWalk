import React from 'react';

function IndividualReviewBody(props) {
  let currentbody = props.body;
  if (currentbody.length > 20) {
    let part1 = currentbody.substring(0, 20);
    let part2 = currentbody.substring(20);
    console.log(part1, 'part 1')
    console.log(part2, 'part 2')
  }

  return (
    <div>
      <p className="hide-overflow">{currentbody}</p>
      <button onClick={props.showMoreClickHandler}>Show more</button>
    </div>
  )
}


export default IndividualReviewBody;

