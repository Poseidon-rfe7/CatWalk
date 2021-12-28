import React from 'react'

const CompareModal = (props) => {
  const className = props.show ? "modal display-block" : "modal display-none"
  return (
    <div className={className}>
      <div className="modal-main">



       <button type="button" onClick={props.closemodal} value="close"> Close </button>
      </div>
    </div>
  )
}

export default CompareModal