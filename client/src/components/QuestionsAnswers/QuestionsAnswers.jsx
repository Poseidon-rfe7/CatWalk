import React from 'react';
import axios from 'axios';
import Search from './Search.jsx';
import QuestionsList from './QuestionsList.jsx';

class QuestionsAnswers extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentProduct: { id: 0 },
      questions: [],
      showHideMoreQuestions: true
    };
  }

  //testing api calls
  componentDidMount() {
    // console.log(this.props)
    // axios.get(`/api/qa/questions/543286/answers`)
    //   .then((result) => { console.log('Answers api call: ', result.data) });
    // axios.get(`/api/products`)
    // .then((result) => { console.log('All products: ', result.data) });
    // axios.get('/api/qa/questions/?product_id=37313')
    //   .then((result) => {console.log('Questions for specific product: ', result.data)});
  };

  componentDidUpdate(prevProps, prevState) {
    let samePropsId = prevProps.currentProduct.id === this.props.currentProduct.id;
    let sameStateId = prevState.currentProduct.id === this.state.currentProduct.id;

    if (prevProps.currentProduct && this.props.currentProduct && !samePropsId && !sameStateId) {
      console.log('Previous state: ', prevState.currentProduct.id);
      console.log('Current state: ', this.state.currentProduct.id);
      this.getQuestions();
    }
  };

  static getDerivedStateFromProps(props, state) {
    if (props.currentProduct && props.currentProduct.id !== state.currentProduct.id) {
      return {
        currentProduct: props.currentProduct
      };
    }
    return null;
  };

  getQuestions() {
    axios.get(`/api/qa/questions/?product_id=${this.state.currentProduct.id}`)
      .then((response) => {
        this.setState({questions: response.data.results});
      })
      .catch(err => console.log(err));
  };


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
  };
}

export default QuestionsAnswers