import React from 'react';
import ProductsOverview from './ProductOverview/ProductOverView.jsx'
import QuestionsAnswers from './QuestionsAnswers/QuestionsAnswers.jsx'
import RatingsReviews from './RatingsReviews/RatingsReviews.jsx'
import RelatedItems from './RelatedItems/RelatedItems.jsx'
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      productsList: [],
      currentProduct: {}
    };
  }

  refreshProducts () {
    axios.get('/api/products')
    .then(result => this.setState({productsList: result.data}))
    .catch(err => console.log(err))
  }

  componentDidMount() {

    // return new Promise(function(resolve, reject) {
    // }).then(console.log('promise resolved'))


    this.refreshProducts()
  }


  render() {
    return(
      <div>
        <ProductsOverview/>
        <RelatedItems/>
        <QuestionsAnswers />
        <RatingsReviews />
      </div>
    )
  }
}

export default App;