import React from "react";
import ReviewList from './ReviewList.jsx';
import IndividualReviewThumbnailModal from './IndividualReviewThumbnailModal.jsx';
import SortOptions from './SortOptions.jsx';
import ProductBreakdown from './ProductBreakdown.jsx';
import RatingsBreakdown from './RatingsBreakdown.jsx';

import axios from 'axios';

class RatingsReviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentProduct: {id: 0},
      reviewCount: 3,
      currentSort: 'relevance',
      allProductReviews: [],
      allProductReviewsMeta: [],
      allProductNewestReviews: [],
      allProductHelpfulReviews: [],
      allProductRelevantReviews: [],
      currentReviews: [],
      modifiedReviews: [],
      moreReviewsButtonStatus: 'showEl',
    };
    this.sortChangeHandler = this.sortChangeHandler.bind(this);
    this.moreReviewsClickHandler = this.moreReviewsClickHandler.bind(this);
    this.helpfulClickHandler = this.helpfulClickHandler.bind(this);
  }

  componentDidMount() {
    console.log('mounting now');
  };

  componentDidUpdate(prevProps){
    // checking if current product is not undefined
    if (prevProps.currentProduct && this.props.currentProduct && prevProps.currentProduct.id !== this.props.currentProduct.id ) {
      this.getAllProductReviewsMeta();
      this.getInitialAllProductRelevantReviews(this.state.reviewCount);
    }
  };

  static getDerivedStateFromProps(props, state) {
    // checking if current product is not undefined
    if (props.currentProduct && props.currentProduct.id !== state.currentProduct.id) {
      return {
        currentProduct: props.currentProduct,
      };
    }
    return null;
  };

  // NOT USED YET
  getAllProductReviews(count) {
    axios.get('/api/reviews/', {params: {product_id: this.state.currentProduct.id, count: count}})
    .then(result => this.setState({allProductReviews: result.data.results}))
    .catch(err => console.log('Error:', err));
  };

  getAllProductReviewsMeta() {
    axios.get('/api/reviews/meta', {params: {product_id: this.state.currentProduct.id}})
    .then(result => this.setState({allProductReviewsMeta: result.data}))
    .catch(err => console.log('Error:', err));
  };

  getAllProductNewestReviews(count, isHelpful) {
    axios.get('/api/reviews/', {params: {product_id: this.state.currentProduct.id, sort: 'newest', count: count}})
    .then(result => {
      if (this.state.modifiedReviews.length === result.data.results.length && !isHelpful) {
        this.setState({modifiedReviews: result.data.results, moreReviewsButtonStatus: 'hideEl'})
      } else {
        this.setState({modifiedReviews: result.data.results.slice(0, result.data.results.length - 1)})
      }
    })
    .catch(err => console.log('Error:', err));
  };

  getAllProductHelpfulReviews(count, isHelpful) {
    axios.get('/api/reviews/', {params: {product_id: this.state.currentProduct.id, sort: 'helpful', count: count}})
    .then(result => {
      if (this.state.modifiedReviews.length === result.data.results.length && !isHelpful) {
        this.setState({modifiedReviews: result.data.results, moreReviewsButtonStatus: 'hideEl'})
      } else {
        this.setState({modifiedReviews: result.data.results.slice(0, result.data.results.length - 1)})
      }
    })
    .catch(err => console.log('Error:', err));
  };

  getAllProductRelevantReviews(count, isHelpful) {
    axios.get('/api/reviews/', {params: {product_id: this.state.currentProduct.id, sort: 'relevant', count: count}})
    .then(result => {
      if (this.state.modifiedReviews.length + 1 === result.data.results.length && !isHelpful) {
        this.setState({modifiedReviews: result.data.results, moreReviewsButtonStatus: 'hideEl'})
      } else {
        this.setState({modifiedReviews: result.data.results.slice(0, result.data.results.length - 1)})
      }
    })

    .catch(err => console.log('Error:', err));
  };

  getInitialAllProductRelevantReviews(count) {
    axios.get('/api/reviews/', {params: {product_id: this.state.currentProduct.id, sort: 'relevant', count: count}})
    .then(result => this.setState({modifiedReviews: result.data.results.slice(0, result.data.results.length - 1)}))
    .catch(err => console.log('Error:', err));
  };

  sortChangeHandler(event) {
    let text = event.target.options[event.target.selectedIndex].text;
    let currentReviewLength = this.state.modifiedReviews.length;
    return new Promise((resolve, reject) => {
      this.setState({reviewCount: 3, moreReviewsButtonStatus: 'showEl'})
      resolve();
    }).then(() => {
      if (text === 'relevance') {
        this.getAllProductRelevantReviews(this.state.reviewCount);
      } else if (text === 'helpful') {
        this.getAllProductHelpfulReviews(this.state.reviewCount);
      } else {
        this.getAllProductNewestReviews(this.state.reviewCount);
      }
    }).then(() => {
      if (text === 'relevance') {
        this.setState({modifiedReviews: this.state.allProductRelevantReviews})
      } else if (text === 'helpful') {
        this.setState({modifiedReviews: this.state.allProductHelpfulReviews})
      } else {
        this.setState({modifiedReviews: this.state.allProductNewestReviews})
      }
    })
  }

  moreReviewsClickHandler() {
    let newCount = this.state.reviewCount + 2;
    let newLength = 0;
    return new Promise((resolve, reject) => {
      this.setState({reviewCount: newCount})
      resolve()
    }).then(() => {
      if (this.state.currentSort === 'relevance') {
        this.getAllProductRelevantReviews(newCount)
      } else if (this.state.currentSort === 'helpful') {
        this.getAllProductHelpfulReviews(newCount);
      } else {
        this.getAllProductNewestReviews(newCount);
      }
    }).then(() => {
      let newLength = this.state.allProductRelevantReviews.length;
      let oldLength = this.state.modifiedReviews.length;
    })
  }

  helpfulClickHandler(event) {
    let reviewId = event.target.getAttribute('id')
    axios.put(`api/reviews/${reviewId}/helpful`)
    .then((result) => {
      if (this.state.currentSort === 'relevance') {
        this.getAllProductRelevantReviews(this.state.reviewCount, true)
      } else if (this.state.currentSort === 'helpful') {
        this.getAllProductHelpfulReviews(this.state.reviewCount, true);
      } else {
        this.getAllProductNewestReviews(this.state.reviewCount, true);
      }
    })
  }

  render() {
    return (
      <div id="ratings-reviews-main-container">
        <div id='child-ratings-reviews'>
          {/* title section */}
          <h3 id="ratings-reviews-title">RATINGS &#38; REVIEWS</h3>

          {/* ratings and reviews container */}
          <section id="ratings-reviews-container">
            {/* left sidebar */}
            <div id="ratings-reviews-sidebar">
              <div>
                <RatingsBreakdown product={this.state.modifiedReviews} meta={this.state.allProductReviewsMeta} currentProduct={this.state.currentProduct}/>
              </div>
              <div>
                <ProductBreakdown product={this.state.modifiedReviews} meta={this.state.allProductReviewsMeta} currentProduct={this.state.currentProduct}/>
              </div>
            </div>
            {/* list items */}
            <div id="ratings-reviews-list-items">

              <div>
                <SortOptions sortChangeHandler={this.sortChangeHandler}/>
              </div>

              <div id='review-list-scroll-wrapper'>
                <ReviewList product={this.state.modifiedReviews} meta={this.state.allProductReviewsMeta} helpfulClickHandler={this.helpfulClickHandler}/>
                <IndividualReviewThumbnailModal />
              </div>

              <div id="more-reviews-button-container" className={this.state.moreReviewsButtonStatus}>
                <button onClick={this.moreReviewsClickHandler} className={'qa-button more-questions'}>More Reviews</button>
                <button className={'qa-button more-questions'}>Add A Review</button>

              </div>
            </div>
          </section>
        </div>
      </div>
    )
  }
};

export default RatingsReviews;



