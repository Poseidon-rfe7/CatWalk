import React from 'react';
import axios from 'axios';

class AddAnswerModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      nickname: '',
      answer: '',
      photots: []
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleNicknameChange = this.handleNicknameChange.bind(this);
    this.handleAnswerChange = this.handleAnswerChange.bind(this);
    this.handleSubmitClick = this.handleSubmitClick.bind(this);
    this.handleCancelClick = this.handleCancelClick.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  handleNicknameChange(event) {
    this.setState({ nickname: event.target.value });
  }

  handleAnswerChange(event) {
    this.setState({ answer: event.target.value });
  }

  handleSubmitClick(event) {
    event.preventDefault();
    let validEmail = this.validateEmail(this.state.email);
    let validNickname = this.state.email !== this.state.nicmname && this.state.nickname.length > 0;
    let validAnswer = this.state.answer.length > 0;

    if (validEmail && validNickname && validAnswer) {
      this.resetForm();
      let params = {
        body: this.state.answer,
        name: this.state.nickname,
        email: this.state.email,
        photos: this.state.photos
      };

      axios.post(`/api/qa/questions/${this.props.currentQuestion}/answers`, params)
        .then((result) => {
          console.log('Success!');
        })
        .catch(err => console.log(err));

    } else if (!validEmail) {
      alert('Invalid email address');
    } else if (!validNickname) {
      alert('You must enter the following: Nickname');
    } else if (!validAnswer) {
      alert('You must enter the following: Answer');
    } else {
      alert('Invalid input(s)')
    }
  }

  handleCancelClick() {
    this.resetForm();
    let modal = document.getElementById('answer-modal');
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
      answer: '',
      photos: []
    });
  }

  render() {
    return (
      <div id='answer-modal' className='modal-form modalOff-form'>
        <div className='askQuestion-form'>
          <h1 className='reset-margins'>Submit your answer</h1>
          <h3 className='reset-margins'>{this.props.productName}: {this.props.currentQuestion.question_body}</h3>
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
            <label htmlFor='answer-input'>Your answer:</label><br />
            <textarea id='answer-input' maxLength='1000' placeholder='Ask your answer...' className='qa-textarea' onChange={this.handleAnswerChange} value={this.state.answer} /><br />
            <input type='submit' value='Submit' className='modal-button' onClick={this.handleSubmitClick} />
            <input type='button' value='Cancel' onClick={this.handleCancelClick} className='modal-button' />
          </form>
        </div>
      </div>
    )
  }
}

export default AddAnswerModal;