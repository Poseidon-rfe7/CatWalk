import React from 'react';

function Characteristics(props) {
  const characteristicSelection = {
    Size: {1: 'A size too small', 2: '½ a size too small', 3: 'Perfect', 4: '½ a size too big', 5: 'A size too wide'},
    Width: {1: 'Too narrow', 2: 'Slightly narrow', 3: 'Perfect', 4: 'Slightly wide', 5: 'Too wide'},
    Comfort: {1: 'Uncomfortable', 2: 'Slightly uncomfortable', 3: 'Ok', 4: 'Comfortable', 5: 'Perfect'},
    Quality: {1: 'Poor', 2: 'Below average', 3: 'What I expected', 4: 'Pretty great', 5: 'Perfect'},
    Length: {1: 'Runs Short', 2: 'Runs slightly short', 3: 'Perfect', 4: 'Runs slightly long', 5: 'Runs long'},
    Fit: {1: 'Runs tight', 2: 'Runs slightly tight', 3: 'Perfect', 4: 'Runs slightly long', 5: 'Runs long'}
  }

  if (props.meta.characteristics === undefined) {
    return null;
  }

  let keys = Object.keys(props.meta.characteristics);

  return (
    <div>
      { keys.map((characteristic, i) => {
        return (
          <div className="row characteristic-row-container" key={i}>
            <div className="characteristic-title row-inner-elements">
              <label htmlFor="characteristic">*{characteristic}</label>
            </div>
            <div className="characteristic-radios">
              <div className='radio-container row-inner-elements'>
                <div className='radio-input-container shrink-radio'>
                  <input
                    type="radio"
                    name={characteristic}
                    value={characteristicSelection[characteristic]['1']}
                    charid={props.meta.characteristics[characteristic].id}
                    rating='1'
                    onClick={props.characteristicClickHandler}
                    className='row-inner-elements'/> <span className='row-inner-elements'>{characteristicSelection[characteristic]['1']}</span>
                </div>
                <div className='radio-input-container shrink-radio'>
                  <input
                    type="radio"
                    name={characteristic}
                    value={characteristicSelection[characteristic]['2']}
                    charid={props.meta.characteristics[characteristic].id}
                    rating='2'
                    onClick={props.characteristicClickHandler}
                    className='row-inner-elements'/> <span className='row-inner-elements'>{characteristicSelection[characteristic]['2']}</span>
                </div>
                <div className='radio-input-container shrink-radio'>
                  <input
                    type="radio"
                    name={characteristic}
                    value={characteristicSelection[characteristic]['3']}
                    charid={props.meta.characteristics[characteristic].id}
                    rating='3'
                    onClick={props.characteristicClickHandler}
                    className='row-inner-elements'/> <span className='row-inner-elements'>{characteristicSelection[characteristic]['3']}</span>
                </div>
                <div className='radio-input-container shrink-radio'>
                  <input
                    type="radio"
                    name={characteristic}
                    value={characteristicSelection[characteristic]['4']}
                    charid={props.meta.characteristics[characteristic].id}
                    rating='4'
                    onClick={props.characteristicClickHandler}
                    className='row-inner-elements'/> <span className='row-inner-elements'>{characteristicSelection[characteristic]['4']}</span>
                </div>
                <div className='radio-input-container shrink-radio'>
                  <input
                    type="radio"
                    name={characteristic}
                    value={characteristicSelection[characteristic]['5']}
                    charid={props.meta.characteristics[characteristic].id}
                    rating='5'
                    onClick={props.characteristicClickHandler}
                    className='row-inner-elements'/> <span className='row-inner-elements'>{characteristicSelection[characteristic]['5']}</span>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Characteristics;