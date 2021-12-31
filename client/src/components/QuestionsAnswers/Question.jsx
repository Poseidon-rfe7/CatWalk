import React from 'react';
import AnswersList from './AnswersList.jsx'

const Question = (props) => {
  return (
    <div>
      <span>Q: This is a question?</span>
      <span>Helpful? <button>Yes (25)</button> | <button>Add Answer</button></span>
      <AnswersList />
    </div>
  )
};

export default Question;