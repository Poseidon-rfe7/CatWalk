import React from 'react';
import ProductsOverview from './ProductOverview/ProductOverView.jsx'
import QuestionsAnswers from './QuestionsAnswers/QuestionsAnswers.jsx'
import RatingsReviews from './RatingsReviews/RatingsReviews.jsx'
import RelatedItems from './RelatedItems/RelatedItems.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state={};
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