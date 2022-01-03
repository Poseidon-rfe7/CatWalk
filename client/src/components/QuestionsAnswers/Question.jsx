import React from 'react';
import AnswersList from './AnswersList.jsx';
import axios from 'axios';

let source;

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: [],
      count: 2
    }

    source = axios.CancelToken.source();
  }

  componentDidMount() {
    this.getAnswers(this.props.question.question_id);
  }

  componentDidUpdate(prevProps, prevState) {
    let sameQuestion = prevProps.question.question_id === this.props.question.question_id;
    let sameCount = prevState.count === this.state.count;

    if (prevProps.question.question_id !== this.props.question.question_id) {
      this.setState({count: 2});
      this.getAnswers(this.props.question.question_id);
    } else if (!sameCount) {
      this.getAnswers(this.props.question.question_id);
    }
  }

  getAnswers(question_id, count) {
    axios.get(`/api/qa/questions/${question_id}/answers/?count=${this.state.count}`, {cancelToken: source.token})
      .then((response) => {
        this.setState({ answers: response.data.results });
      })
      .catch(err => console.log(err));
  }

  loadMoreAnswers() {
    this.setState({count: this.state.count + 2});
  }

  componentWillUnmount() {
    if (source) {
      source.cancel("call canceled");
    }
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
        <button className='qa-button' onClick={this.loadMoreAnswers.bind(this)}>Load More Answers</button>
      </div>
    )
  }
}

export default Question;