import React from 'react';
import axios from 'axios';
import Search from './Search.jsx';
import QuestionsList from './QuestionsList.jsx';

class QuestionsAnswers extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showHideMoreQuestions: true
    };
  }

  componentDidMount() {
    // console.log(this.props)
    axios.get(`/api/qa/questions/?product_id=37317`)
    .then((result) => {console.log(result.data)});
  }

  render() {
    return (
      <div>
        <h2>Questions & Answers</h2>
        <Search />
        <QuestionsList />
        {this.state.showHideMoreQuestions && <button>More Answered Questions</button>}
        <button>Add a Question +</button>
      </div>
    )
  }
}

export default QuestionsAnswers