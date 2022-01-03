import React from 'react';
import Answer from './Answer.jsx';

const AnswersList = (props) => {
  return (
    <div className='answers-list'>
      {/* map over answers in list */}
      <div>A:</div>
      <div>{props.answers.map((answer) => <Answer key={answer.answer_id} answer={answer} />)}</div>
    </div>
  )
};

export default AnswersList;