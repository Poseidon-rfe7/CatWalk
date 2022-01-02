import React from 'react';
import AnswersList from './AnswersList.jsx';
import axios from 'axios';

// const Question = (props) => {
//   console.log(props.getAnswers(props.question.question_id));

//   return (
//     <div>
//       <div className='single-question'>
//         Q: {props.question.question_body}
//         <span className='qa-helpful q-helpful'>
//           Helpful?
//           <button className='qa-button helpful-button'>Yes ({props.question.question_helpfulness})</button>
//           |
//           <button className='qa-button helpful-button'> Add Answer</button>
//         </span>
//       </div>
//       {/* {answers.length > 0 && <AnswersList answers={getAnswersList} />} */}
//     </div>
//   )
// };


class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: []
    }
  }

  componentDidMount() {
    this.getAnswers(this.props.question.question_id);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.question.question_id !== this.props.question.question_id) {
    this.getAnswers(this.props.question.question_id);
    }
  }

  getAnswers(question_id) {
    axios.get(`/api/qa/questions/${question_id}/answers`)
      .then((response) => {
        this.setState({ answers: response.data.results });
      })
      .catch(err => console.log(err));
  }


  render() {
    return (
      <div>
        <div className='single-question'>
          Q: {this.props.question.question_body}
          <span className='qa-helpful q-helpful'>
            Helpful?
            <button className='qa-button helpful-button'>Yes ({this.props.question.question_helpfulness})</button>
            |
            <button className='qa-button helpful-button'> Add Answer</button>
          </span>
        </div>
        {this.state.answers.length > 0 && <AnswersList answers={this.state.answers} />}
      </div>
    )
  }
}

export default Question;