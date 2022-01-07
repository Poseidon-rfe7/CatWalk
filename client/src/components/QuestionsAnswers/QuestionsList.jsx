import React from 'react';
import Question from './Question.jsx';

const QuestionsList = (props) => {
  return (
    <div id='qa-list'>
      {props.questions.map((question) =>
      <Question key={question.question_id} question={question} />)}
    </div>
  )
};

export default QuestionsList;