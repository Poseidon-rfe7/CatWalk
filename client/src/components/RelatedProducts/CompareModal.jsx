import React from 'react'

const CompareModal = (props) => {
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