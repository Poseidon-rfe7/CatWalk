import React from 'react';

class AskQuestionsModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      nickname: '',
      question: '',
      date: ''
    };

    this.handleCancelClick = this.handleCancelClick.bind(this);
  }

  handleCancelClick(event) {
    event.preventDefault();
    // this.resetForm();
    let modal = document.getElementById('question-modal');
    modal.classList.remove('modalOn-form')
    modal.classList.add('modalOff-form')
  }

  render() {
    return (
      <div id='question-modal' className='modal-form modalOff-form'>
        <div className='askQuestion-form'>
          <h1 className='reset-margins'>Ask Your Question</h1>
          <h3 className='reset-margins'>About the {this.props.currentProduct.name}</h3>
          <form>
            <div className='username-email'>
              <label htmlFor='email-input'>Email: </label>
              <input id='email-input' type='email' placeholder='Example: jack@email.com' />
              <label htmlFor='nickname-input' className='username'>Nickname: </label>
              <input id='nickname-input' type='text' placeholder='Example: jackson11!'/>
            </div>
            <label htmlFor='question-input'>Your question:</label><br />
            <textarea id='question-input' maxLength='1000' placeholder='Ask your question...' className='qa-textarea'/><br />
            <input type='submit' value='Submit' className='modal-button' />
            <input type='button' value='Cancel' onClick={this.handleCancelClick} className='modal-button' />
          </form>
        </div>
      </div>
    )
  }
}

export default AskQuestionsModal;