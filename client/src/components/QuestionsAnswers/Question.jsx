import React from 'react';
import AnswersList from './AnswersList.jsx'

const Question = (props) => {
  return (
    <div>
      <div className='single-question'>
        Q: {props.question.question_body}
        <span className='qa-helpful q-helpful'>
          Helpful?
          <button className='qa-button helpful-button'>Yes ({props.question.question_helpfulness})</button>
          |
          <button className='qa-button helpful-button'> Add Answer</button>
        </span>
      </div>
      {props.question.answers.length > 0 && <AnswersList answers={props.question.answers} />}
    </div>
  )
};

export default Question;