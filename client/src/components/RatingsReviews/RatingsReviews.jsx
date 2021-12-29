import React from "react";
import ReviewList from './ReviewList.jsx';
import IndividualReviewThumbnailModal from './IndividualReviewThumbnailModal.jsx';
import SortOptions from './SortOptions.jsx';
import axios from 'axios';

class RatingsReviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentProduct: {id: 0},
      reviewCount: 0,
      allProductReviews: [],
      allProductReviewsMeta: [],
      allProductNewestReviews: [],
      allProductHelpfulReviews: [],
      allProductRelevantReviews: [{
        body: '',
        date: '',
        helpfulness: 0,
        photos: [],
        rating: 0,
        recommend: true,
        response: null,
        review_id: 0,
        reviewer_name: '',
        summary: ''
      }],
      currentReviews: [{
        body: '',
        date: '',
        helpfulness: 0,
        photos: [],
        rating: 0,
        recommend: true,
        response: null,
        review_id: 0,
        reviewer_name: '',
        summary: ''
      }],
      modifiedReviews: [],
      moreReviewsButtonStatus: 'showEl'
    };
    this.sortChangeHandler = this.sortChangeHandler.bind(this);
    this.moreReviewsClickHandler = this.moreReviewsClickHandler.bind(this);
  }

  componentDidMount() {
    console.log('mounting now');
  };

  componentDidUpdate(prevProps){
    // checking if current product is not undefined
    if (prevProps.currentProduct && this.props.currentProduct && prevProps.currentProduct.id !== this.props.currentProduct.id ) {
      this.getAllProductReviews();
      this.getAllProductReviewsMeta();
      this.getAllProductNewestReviews();
      this.getAllProductHelpfulReviews();
      this.getAllProductRelevantReviews();
      this.getCurrentAllProductRelevantReviews();
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

  getAllProductReviews() {
    axios.get('/api/reviews/', {params: {product_id: this.state.currentProduct.id}})
    .then(result => this.setState({allProductReviews: result.data.results}))
    .catch(err => console.log('Error:', err));
  };

  getAllProductReviewsMeta() {
    axios.get('/api/reviews/meta', {params: {product_id: this.state.currentProduct.id}})
    .then(result => this.setState({allProductReviewsMeta: result.data}))
    .catch(err => console.log('Error:', err));
  };

  getAllProductNewestReviews() {
    axios.get('/api/reviews/', {params: {product_id: this.state.currentProduct.id, sort: 'newest'}})
    .then(result => this.setState({allProductNewestReviews: result.data.results}))
    .catch(err => console.log('Error:', err));
  };

  getAllProductHelpfulReviews() {
    axios.get('/api/reviews/', {params: {product_id: this.state.currentProduct.id, sort: 'helpful'}})
    .then(result => this.setState({allProductHelpfulReviews: result.data.results}))
    .catch(err => console.log('Error:', err));
  };

  getAllProductRelevantReviews() {
    axios.get('/api/reviews/', {params: {product_id: this.state.currentProduct.id, sort: 'relevant'}})
    .then(result => this.setState({allProductRelevantReviews: result.data.results}))
    .catch(err => console.log('Error:', err));
  };

  getCurrentAllProductRelevantReviews() {
    axios.get('/api/reviews/', {params: {product_id: this.state.currentProduct.id, sort: 'relevant'}})
    .then(result => {
      if (result.data.results.length > 2) {
        this.setState({currentReviews: result.data.results, modifiedReviews: result.data.results.slice(0, 2), moreReviewsButtonStatus: 'showEl'})
      } else {
        this.setState({currentReviews: result.data.results, modifiedReviews: result.data.results.slice(0, 2), moreReviewsButtonStatus: 'hideEl'})
      }
    })
    .catch(err => console.log('Error:', err));
  };

  sortChangeHandler(event) {
    if (this.state.currentReviews.length > 2) {
      this.setState({moreReviewsButtonStatus: 'showEl'})
    }
    let text = event.target.options[event.target.selectedIndex].text;
    if (text === 'relevance') {
      this.setState({currentReviews: this.state.allProductRelevantReviews, modifiedReviews: this.state.allProductRelevantReviews.slice(0, 2)});
    } else if (text === 'helpful') {
      this.setState({currentReviews: this.state.allProductHelpfulReviews, modifiedReviews: this.state.allProductHelpfulReviews.slice(0, 2)});
    } else {
      this.setState({currentReviews: this.state.allProductNewestReviews, modifiedReviews: this.state.allProductNewestReviews.slice(0, 2)});
    }
  }

  moreReviewsClickHandler() {
    if (this.state.currentReviews.length > this.state.modifiedReviews.length) {
      return new Promise((resolve, reject) => {
        this.setState({modifiedReviews: this.state.currentReviews.slice(0, this.state.modifiedReviews.length + 2)})
        resolve()
      }).then(() => {
        if (this.state.modifiedReviews.length === this.state.currentReviews.length) {
          this.setState({moreReviewsButtonStatus: 'hideEl'})
        }
      })
    }
  }

  render() {
    return (
      <div id="ratings-reviews-main-container">
        {/* title section */}
        <p id="ratings-reviews-title">RATINGS &#38; REVIEWS</p>

        {/* ratings and reviews container */}
        <section id="ratings-reviews-container">
          {/* left sidebar */}
          <div id="ratings-reviews-sidebar">
            <div>
              <p>Rating Breakdown Component</p>
            </div>
            <div>
              <p>Product Breakdown Component</p>
            </div>
          </div>
          {/* list items */}
          <div id="ratings-reviews-list-items">

            <div>
              <SortOptions sortChangeHandler={this.sortChangeHandler}/>
            </div>

            <div>
              <ReviewList product={this.state.modifiedReviews} meta={this.state.allProductReviewsMeta}/>
              <IndividualReviewThumbnailModal />
            </div>

            <div id="more-reviews-button-container" className={this.state.moreReviewsButtonStatus}>
              <button onClick={this.moreReviewsClickHandler}>More Reviews</button>
            </div>
          </div>
        </section>
      </div>
    )
  }
};

export default RatingsReviews;
