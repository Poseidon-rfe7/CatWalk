import React from 'react';

function ProductBreakdownProgressBar(props) {

  const characteristicSelection = {
    Size: {1: 'A size too small', 2: '½ a size too small', 3: 'Perfect', 4: '½ a size too big', 5: 'A size too wide'},
    Width: {1: 'Too narrow', 2: 'Slightly narrow', 3: 'Perfect', 4: 'Slightly wide', 5: 'Too wide'},
    Comfort: {1: 'Uncomfortable', 2: 'Slightly uncomfortable', 3: 'Ok', 4: 'Comfortable', 5: 'Perfect'},
    Quality: {1: 'Poor', 2: 'Below average', 3: 'What I expected', 4: 'Pretty great', 5: 'Perfect'},
    Length: {1: 'Runs Short', 2: 'Runs slightly short', 3: 'Perfect', 4: 'Runs slightly long', 5: 'Runs long'},
    Fit: {1: 'Runs tight', 2: 'Runs slightly tight', 3: 'Perfect', 4: 'Runs slightly long', 5: 'Runs long'}
  }

  if (props.characteristics === undefined) {
    return null;
  }

  let keys = Object.keys(props.characteristics);
  return (
    <div>
      {/* {console.log(props.characteristics)} */}
      {  keys.map((characteristic) => {
          return (
            <div className='product-progress-bar-container' key={props.characteristics[characteristic].id}>
              <div className="characteristic-titles">{characteristic}</div>
              <progress value={props.characteristics[characteristic].value} max={5}>{100}%</progress>
              <div className='characteristic-container'>
                <p className='tiny-font'>{characteristicSelection[characteristic]['1']}</p>
                <p className='tiny-font'>{characteristicSelection[characteristic]['2']}</p>
                <p className='tiny-font'>{characteristicSelection[characteristic]['3']}</p>
                <p className='tiny-font'>{characteristicSelection[characteristic]['4']}</p>
                <div className='last-characteristic tiny-font'><p>{characteristicSelection['Size']['5']}</p></div>
              </div>
          </div>
          )
      })}
    </div>
  )
}

export default ProductBreakdownProgressBar;