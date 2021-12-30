import React, {useState, useEffect} from 'react'
import CompareTable from './CompareTable.jsx'

const CompareModal = ({show, closemodal, compareinfo}) => {
  const [compareThese, setCompareThese] = useState([{name: 'item1', category: 'category', default_price: 0}, {name: 'item2', category: 'category', default_price: 0}])
    const [compareFeatures, setCompareFeatures] = useState ([])
// create an object for each that has the feature name as the key and the values to be listed for that column as the values
//dynamicly render the columns with key and current[key], etc or if that value is not there use ''
// [ {characteristic: {c: 'feature', r: 'feature'} },
                      //  { char2: c: 'whatever' r: ''} ]

  useEffect(()=>{
    if (compareinfo.length > 0) {
      setCompareThese(compareinfo)

      let currentfeatures = {}
      let relatedfeatures = {}
      for (let i = 0; i < compareinfo[0].features.length; i++) {
        let currentfeature = compareinfo[0].features[i]
        currentfeatures[currentfeature.feature] = currentfeature['value']
      }
      for (let i = 0; i < compareinfo[1].features.length; i++) {
        let currentfeature = compareinfo[1].features[i]
        relatedfeatures[currentfeature.feature] = currentfeature['value']
      }
      setCompareFeatures([currentfeatures, relatedfeatures])
    }


  }, [compareinfo])


  const className = show ? "compare-modal compare-display-block" : "compare-modal compare-display-none"

  return (
    <div className={className}>
      <div className="compare-modal-main">
      <table>
        <thead>
          <tr>
            <th>{compareThese[0].name}</th>
            <th>Feature</th>
            <th>{compareThese[1].name}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{compareThese[0].category}</td>
            <td>Category</td>
            <td>{compareThese[1].category}</td>
          </tr>
          <tr>
            <td>{compareThese[0].default_price}</td>
            <td>Price</td>
            <td>{compareThese[1].default_price}</td>
          </tr>


        </tbody>
      </table>

       <button type="button" onClick={closemodal} value="close"> Close </button>
      </div>
    </div>
  )
}

export default CompareModal