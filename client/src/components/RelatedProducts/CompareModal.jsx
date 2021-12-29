import React, {useState} from 'react'

const CompareModal = (props) => {
  const [combindInfo, setCombinedInfo] = useState([])
// create an object for each that has the feature name as the key and the values to be listed for that column as the values
//dynamicly render the columns with key and current[key], etc or if that value is not there use ''
// [ {characteristic: {c: 'feature', r: 'feature'} },
                      //  { char2: c: 'whatever' r: ''} ]




  const className = props.show ? "compare-modal compare-display-block" : "compare-modal compare-display-none"
  return (
    <div className={className}>
      <div className="compare-modal-main">
        <table>
          <thead>
            <tr>
              <th>Current Item</th>
              <th>Feature</th>
              <th>Related Item</th>
            </tr>
          </thead>
          <tbody>


          </tbody>
        </table>


       <button type="button" onClick={props.closemodal} value="close"> Close </button>
      </div>
    </div>
  )
}

export default CompareModal