import React from 'react';

const AskQuestionsModal = (props) => {
  return (
    <div className='ask-modal'>
      <div className='ask-modal-content'>
        <h1>Ask Your Question</h1>
        <h3>About the {props.currentProduct.name}</h3>
        <form>
          <input type='submit' value='Submit' />
          <input type='button' value='Cancel' />
        </form>
      </div>
    </div>
  )
}

export default AskQuestionsModal;