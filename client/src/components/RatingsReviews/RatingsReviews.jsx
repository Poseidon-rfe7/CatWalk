import React from "react";
import ReviewList from './ReviewList.jsx';
import axios from 'axios';

class RatingsReviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentProduct: {id: 0},
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
      }]
    };
  }

  componentDidMount() {
    console.log('mounting now');
  };

  componentDidUpdate(prevProps){
    if ( prevProps.currentProduct !== this.props.currentProduct ) {
      this.getAllProductReviews();
      this.getAllProductReviewsMeta();
      this.getAllProductNewestReviews();
      this.getAllProductHelpfulReviews();
      this.getAllProductRelevantReviews();
    }
  };

  static getDerivedStateFromProps(props, state) {
    if (props.currentProduct.id !== state.currentProduct.id) {
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
    axios.get('/api/reviews/', {params: {product_id: this.state.currentProduct.id}, sort: 'newest'})
    .then(result => this.setState({allProductNewestReviews: result.data.results}))
    .catch(err => console.log('Error:', err));
  };

  getAllProductHelpfulReviews() {
    axios.get('/api/reviews/', {params: {product_id: this.state.currentProduct.id}, sort: 'helpful'})
    .then(result => this.setState({allProductHelpfulReviews: result.data.results}))
    .catch(err => console.log('Error:', err));
  };

  getAllProductRelevantReviews() {
    axios.get('/api/reviews/', {params: {product_id: this.state.currentProduct.id}, sort: 'relevant'})
    .then(result => this.setState({allProductRelevantReviews: result.data.results}))
    .catch(err => console.log('Error:', err));
  };

  render() {
    return (
      <div>
        {/* title section */}
        <p id="ratings-reviews-title">RATINGS &#38; REVIEWS</p>

        {/* ratings and reviews container */}
      <section id="ratings-reviews-container">
        {/* ratings and reviews left sidebar */}
        <div id="ratings-reviews-sidebar">
          <div>
            <p>Rating Breakdown Component</p>
          </div>
          <div>
            <p>Product Breakdown Component</p>
          </div>
        </div>
        {/* ratings and reviews list items */}
        <div id="ratings-reviews-list-items">

          <div>
            <p>Sorting Component</p>
          </div>

          <div>
            <ReviewList product={this.state}/>
          </div>

          <div>
            <p>Buttons Section</p>
          </div>
        </div>
      </section>

      </div>
    )
  }
};

export default RatingsReviews;
