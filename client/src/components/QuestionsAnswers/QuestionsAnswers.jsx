import React from 'react';
import axios from 'axios';
import Search from './Search.jsx';
import QuestionsList from './QuestionsList.jsx';

class QuestionsAnswers extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showHideMoreQuestions: true,
      questions: [{
        answers: [{
          answerer_name: "williamsmith",
          body: "Cool Answer 123ad9na",
          date: "2021-12-26T00:00:00.000Z",
          helpfulness: 0,
          id: 5269122,
          photos: ["https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Generic_Camera_Icon.svg/200px-Generic_Camera_Icon.svg.png"]
        },
        {
          answerer_name: "coolNameBro",
          body: "Sick answer bro",
          date: "2021-12-22T00:00:00.000Z",
          helpfulness: 7,
          id: 5269125,
          photos: [
            "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Generic_Camera_Icon.svg/200px-Generic_Camera_Icon.svg.png",
            "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Generic_Camera_Icon.svg/200px-Generic_Camera_Icon.svg.png",
            "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Generic_Camera_Icon.svg/200px-Generic_Camera_Icon.svg.png",
            "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Generic_Camera_Icon.svg/200px-Generic_Camera_Icon.svg.png",
            "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Generic_Camera_Icon.svg/200px-Generic_Camera_Icon.svg.png"
          ]
        },
        {
          answerer_name: "wonderfulName",
          body: "Amazing answer",
          date: "2021-12-12T00:00:00.000Z",
          helpfulness: 6,
          id: 5269135,
          photos: ["https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Generic_Camera_Icon.svg/200px-Generic_Camera_Icon.svg.png"]
        }],
        asker_name: "James L Plier",
        question_body: "Testing a sample question",
        question_date: "2021-11-08T00:00:00.000Z",
        question_helpfulness: 2,
        question_id: 543286,
        reported: false
      },
      {
        answers: [],
        asker_name: "asfdasdfasdf",
        question_body: "asfasfdsadf",
        question_date: "2021-11-02T00:00:00.000Z",
        question_helpfulness: 1,
        question_id: 542892,
        reported: false
      },
      {
        answers: [{
          answerer_name: "funnyName",
          body: "Serious answer",
          date: "2021-11-22T00:00:00.000Z",
          helpfulness: 16,
          id: 5269131,
          photos: []
        }],
        asker_name: "randomUser",
        question_body: "??????===??????",
        question_date: "2021-11-08T00:00:00.000Z",
        question_helpfulness: 5,
        question_id: 543289,
        reported: false
      }]
    };
  }

  render() {
    return (
      <div className='questions-answers'>
        <h3 className='reset-margins qa-header'>QUESTIONS & ANSWERS</h3>
        <Search />
        <QuestionsList questions={this.state.questions} />
        {this.state.showHideMoreQuestions && <button className='qa-button more-questions'>More Answered Questions</button>}
        <button className='qa-button more-questions'>Add a Question +</button>
      </div>
    )
  }
}

export default QuestionsAnswers