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
      allQuestions: [],
      renderedQuestions: [],
      questionsToRender: 0,
      showHideMoreQuestions: true
    };

    this.handleMoreQuestionsClick = this.handleMoreQuestionsClick.bind(this);
    this.handleAddQuestionClick = this.handleAddQuestionClick.bind(this);
    this.renderMoreQuestions = this.renderMoreQuestions.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    let sameProduct = prevState.currentProduct.id === this.state.currentProduct.id;

    if (!sameProduct) {
      this.setState({
        currentProduct: {id: 0},
        allQuestions: [],
        renderedQuestions: [],
        questionsToRender: 0,
        showHideMoreQuestions: true
      })
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
    axios.get(`/api/qa/questions/?product_id=${this.state.currentProduct.id}&count=500`)
      .then((response) => {
        this.setState({ allQuestions: response.data.results });
      })
      .then(() => this.handleMoreQuestionsClick())
      .catch(err => console.log(err));
  };

  renderMoreQuestions() {
    let tempQuestionHolder = [];

    for (let i = 0; i < this.state.questionsToRender; i++) {
      tempQuestionHolder.push(this.state.allQuestions[i]);
    }

    this.setState({renderedQuestions: tempQuestionHolder})
  }

  handleMoreQuestionsClick() {
    let newQuestionsAmount;
    if (this.state.allQuestions.length === 0) {
      this.setState({showHideMoreQuestions: false});
      return;
    } else if (this.state.allQuestions.length - this.state.renderedQuestions.length > 1) {
      newQuestionsAmount = this.state.questionsToRender + 2;
    } else if (this.state.allQuestions.length - this.state.renderedQuestions.length === 1) {
      newQuestionsAmount = this.state.questionsToRender + 1;
      this.setState({showHideMoreQuestions: false});
    }
    this.setState({questionsToRender: newQuestionsAmount});
    this.renderMoreQuestions();
  }

  handleAddQuestionClick() {
    let questionModal = document.getElementById('question-modal');
    questionModal.classList.remove('modalOff-form')
    questionModal.classList.add('modalOn-form')
  }

  render() {
    return (
      <div className="questions-answers module-parent">
        
        <Search />
        <QuestionsList
          questions={this.state.renderedQuestions}
          productName={this.state.currentProduct.name}
        />
        <AskQuestionsModal currentProduct={this.state.currentProduct} />
        {this.state.showHideMoreQuestions && (
          <button
            className="qa-button more-questions"
            onClick={this.handleMoreQuestionsClick}
          >
            More Answered Questions
          </button>
        )}
        <button
          className="qa-button more-questions"
          onClick={this.handleAddQuestionClick}
        >
          Add a Question +
        </button>
      </div>
    );
  };
}

export default QuestionsAnswers