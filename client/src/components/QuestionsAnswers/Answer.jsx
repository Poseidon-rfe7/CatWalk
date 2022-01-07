import React from 'react';
import axios from 'axios';

class Answer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handleIsHelpfulClick = this.handleIsHelpfulClick.bind(this);
  }

  handleIsHelpfulClick() {
    console.log(this.props.answer.answer_id);
    axios.put(`/api/qa/questions/${this.props.answer.answer_id}/helpful`)
    .then(() => {
      document.getElementById('answer-helpful').disabled = true;
      console.log('It worked!')
    })
    .catch(err => console.log(err));
  }


  render() {
    return (
      <div className='answer'>
        <p className='reset-margins'>{this.props.answer.body}</p>
        {this.props.answer.photos.length && this.props.answer.photos.map((photo) => {
          return <img src={photo.url} key={photo.id} className='photos-thumbnail' />
        })}
        <div className='qa-helpful a-helpful'>
          by {this.props.answer.answerer_name}, {this.props.answer.date} | Helpful?
          <button id='answer-helpful' className='qa-button helpful-button' onClick={this.handleIsHelpfulClick}>Yes ({this.props.answer.helpfulness})</button>
          |
          <button className='qa-button helpful-button'>Report</button>
        </div>
      </div>
    )
  }
}

export default Answer;