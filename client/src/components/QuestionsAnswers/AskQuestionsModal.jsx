import React from 'react';

const AskQuestionsModal = (props) => {
  return (
    <div className='ask-modal'>
      <div className='ask-modal-content'>
        <h1>Ask Your Question</h1>
        <h3>About the {props.currentProduct.name}</h3>
        <form>
          <label htmlFor='email-input'>Email: </label>
          <input id='email-input' type='email' placeholder='Example: jack@email.com' />
          <label htmlFor='nickname-input'>Nickname: </label>
          <input id='nickname-input' type='text' placeholder='Example: jackson11!' /><br />
          <label htmlFor='question-input'>Your question:</label><br />
          <textarea id='question-input' maxLength='1000' placeholder='Ask your question...' /><br />
          <input type='submit' value='Submit' />
          <input type='button' value='Cancel' />
        </form>
      </div>
    </div>
  )
}

export default AskQuestionsModal;