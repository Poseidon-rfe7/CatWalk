import React from 'react';
import axios from 'axios';
import Search from './Search.jsx';
import QuestionsList from './QuestionsList.jsx';
import AskQuestionsModal from './AskQuestionsModal.jsx';

class QuestionsAnswers extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentProduct: { id: 0 },
      allQuestions: ['placeholder'],
      renderedQuestions: [],
      count: 1,
      questionsToRender: 2,
      showHideMoreQuestions: true
    };

    this.handleMoreQuestionsClick.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    let sameProduct = prevState.currentProduct.id === this.state.currentProduct.id;
    let sameNumOfQuestions = prevState.questionsToRender === this.state.questionsToRender;
    // console.log(prevState.currentProduct);

    if (!sameProduct) {
      this.setState({count: 1});
      this.getQuestions();
    } else if (!sameNumOfQuestions) {
      this.getQuestions();
    }
  };

  static getDerivedStateFromProps(props, state) {
    if (props.currentProduct.id && props.currentProduct.id !== state.currentProduct.id) {
      return {
        currentProduct: props.currentProduct
      };
    }
    return null;
  };

  getQuestions() {
    axios.get(`/api/qa/questions/?product_id=${this.state.currentProduct.id}&count=${this.state.count}`)
      .then((response) => {
        this.setState({ renderedQuestions: response.data.results });
        return response.data.results[response.data.results.length -1]
      })
      .then((lastQuestion) => {
        if (this.state.renderedQuestions.length !== this.state.questionsToRender) {
          let newCount = this.state.count + 1;
          this.setState({count: newCount});
          this.getQuestions();
        }
      })
      .catch(err => console.log(err));
  };

  handleMoreQuestionsClick() {
    let newQuestionsAmount = this.state.questionsToRender + 2;
    this.setState({questionsToRender: newQuestionsAmount});
  }

  render() {
    return (
      <div className='questions-answers'>
        <h3 className='reset-margins qa-header'>QUESTIONS & ANSWERS</h3>
        <Search />
        <QuestionsList questions={this.state.renderedQuestions} />
        <AskQuestionsModal currentProduct={this.state.currentProduct}/>
        {this.state.showHideMoreQuestions && <button className='qa-button more-questions'
        onClick={this.handleMoreQuestionsClick.bind(this)}>More Answered Questions</button>}
        <button className='qa-button more-questions'>Add a Question +</button>
      </div>
    )
  };
}

export default QuestionsAnswers