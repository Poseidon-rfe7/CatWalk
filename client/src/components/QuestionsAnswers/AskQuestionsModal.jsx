import React from 'react';
import axios from 'axios';

class AskQuestionsModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      nickname: '',
      question: ''
    };

    this.handleCancelClick = this.handleCancelClick.bind(this);
    this.handleSubmitClick = this.handleSubmitClick.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleNicknameChange = this.handleNicknameChange.bind(this);
    this.handleQuestionChange = this.handleQuestionChange.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  handleNicknameChange(event) {
    this.setState({ nickname: event.target.value });
  }

  handleQuestionChange(event) {
    this.setState({ question: event.target.value });
  }

  handleSubmitClick(even) {
    event.preventDefault();
    let validEmail = this.validateEmail(this.state.email);
    let validNickname = this.state.email !== this.state.nicmname && this.state.nickname.length > 0;
    let validQuestion = this.state.question.length > 0;

    if (validEmail && validNickname && validQuestion) {
      this.resetForm();
      let params = {
        body: this.state.question,
        name: this.state.nickname,
        email: this.state.email,
        product_id: this.props.currentProduct.id
      };

      axios.post('/api/qa/questions', params)
        .then((result) => {
          console.log('Success!');
        })
        .catch(err => console.log(err));
    } else if (!validEmail) {
      alert('Invalid email address');
    } else if (!validNickname) {
      alert('You must enter the following: Nickname');
    } else if (!validQuestion) {
      alert('You must enter the following: Question');
    } else {
      alert('Invalid input(s)')
    }

  }

  handleCancelClick() {
    this.resetForm();
    let modal = document.getElementById('question-modal');
    modal.classList.remove('modalOn-form')
    modal.classList.add('modalOff-form')
  }

  validateEmail(inputEmail) {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (inputEmail.match(mailformat)) {
      return true;
    }
    else {
      return false;
    }
  }

  resetForm() {
    this.setState({
      email: '',
      nickname: '',
      question: ''
    });
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
              <input id='email-input' type='email' placeholder='Example: jack@email.com' onChange={this.handleEmailChange} value={this.state.email} /><br />
              <p className='form-subtext'>For authentication reasons, you will not be emailed.</p>
            </div>
            <div className='username-email'>
              <label htmlFor='nickname-input' className='username'>Nickname: </label>
              <input id='nickname-input' type='text' placeholder='Example: jackson11!' onChange={this.handleNicknameChange} value={this.state.nickname} />
              <p className='form-subtext'>For privacy reasons, do not use your full name or email address.</p>
            </div>
            <label htmlFor='question-input'>Your question:</label><br />
            <textarea id='question-input' maxLength='1000' placeholder='Ask your question...' className='qa-textarea' onChange={this.handleQuestionChange} value={this.state.question} /><br />
            <input type='submit' value='Submit' className='modal-button' onClick={this.handleSubmitClick} />
            <input type='button' value='Cancel' onClick={this.handleCancelClick} className='modal-button' />
          </form>
        </div>
      </div>
    )
  }
}

export default AskQuestionsModal;