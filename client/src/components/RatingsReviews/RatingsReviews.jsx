import React from "react";
import ReviewList from "./ReviewList.jsx";
import IndividualReviewThumbnailModal from "./IndividualReviewThumbnailModal.jsx";
import SortOptions from "./SortOptions.jsx";
import ProductBreakdown from "./ProductBreakdown.jsx";
import RatingsBreakdown from "./RatingsBreakdown.jsx";
import AddAReview from "./AddAReview/AddAReview.jsx";

import axios from "axios";

class RatingsReviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentProduct: { id: 0 },
      reviewCount: 3,
      currentSort: "relevance",
      allProductReviews: [],
      allProductReviewsMeta: [],
      allProductNewestReviews: [],
      allProductHelpfulReviews: [],
      allProductRelevantReviews: [],
      currentReviews: [],
      modifiedReviews: [],
      moreReviewsButtonStatus: "showEl",
      filters: [],
    };
    this.sortChangeHandler = this.sortChangeHandler.bind(this);
    this.moreReviewsClickHandler = this.moreReviewsClickHandler.bind(this);
    this.helpfulClickHandler = this.helpfulClickHandler.bind(this);
    this.addReviewClickHandler = this.addReviewClickHandler.bind(this);
    this.getAllProductRelevantReviews =
      this.getAllProductRelevantReviews.bind(this);
    this.getAllProductHelpfulReviews =
      this.getAllProductHelpfulReviews.bind(this);
    this.getAllProductNewestReviews =
      this.getAllProductNewestReviews.bind(this);
    this.starFilterClickHandler = this.starFilterClickHandler.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.currentProduct &&
      this.props.currentProduct &&
      prevProps.currentProduct.id !== this.props.currentProduct.id
    ) {
      this.getAllProductReviewsMeta();
      this.getInitialAllProductRelevantReviews(this.state.reviewCount);
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (
      props.currentProduct &&
      props.currentProduct.id !== state.currentProduct.id
    ) {
      return {
        currentProduct: props.currentProduct,
        reviewCount: 3,
      };
    }
    return null;
  }

  getAllProductReviewsMeta() {
    axios
      .get("/api/reviews/meta", {
        params: { product_id: this.state.currentProduct.id },
      })
      .then((result) => this.setState({ allProductReviewsMeta: result.data }))
      .catch((err) => console.log("Error:", err));
  }

  getAllProductNewestReviews(count, isHelpful) {
    axios
      .get("/api/reviews/", {
        params: {
          product_id: this.state.currentProduct.id,
          sort: "newest",
          count: count,
        },
      })
      .then((result) => {
        if (
          this.state.modifiedReviews.length === result.data.results.length &&
          !isHelpful
        ) {
          this.setState({
            modifiedReviews: result.data.results,
            moreReviewsButtonStatus: "hideEl",
          });
        } else {
          this.setState({
            modifiedReviews: result.data.results.slice(
              0,
              result.data.results.length - 1
            ),
          });
        }
      })
      .catch((err) => console.log("Error:", err));
  }

  getAllProductHelpfulReviews(count, isHelpful) {
    axios
      .get("/api/reviews/", {
        params: {
          product_id: this.state.currentProduct.id,
          sort: "helpful",
          count: count,
        },
      })
      .then((result) => {
        if (
          this.state.modifiedReviews.length === result.data.results.length &&
          !isHelpful
        ) {
          this.setState({
            modifiedReviews: result.data.results,
            moreReviewsButtonStatus: "hideEl",
          });
        } else {
          this.setState({
            modifiedReviews: result.data.results.slice(
              0,
              result.data.results.length - 1
            ),
          });
        }
      })
      .catch((err) => console.log("Error:", err));
  }

  getAllProductRelevantReviews(count, isHelpful) {
    axios
      .get("/api/reviews/", {
        params: {
          product_id: this.state.currentProduct.id,
          sort: "relevant",
          count: count,
        },
      })
      .then((result) => {
        if (
          this.state.modifiedReviews.length + 1 ===
            result.data.results.length &&
          !isHelpful
        ) {
          this.setState({
            modifiedReviews: result.data.results,
            moreReviewsButtonStatus: "hideEl",
          });
        } else {
          this.setState({
            modifiedReviews: result.data.results.slice(
              0,
              result.data.results.length - 1
            ),
          });
        }
      })

      .catch((err) => console.log("Error:", err));
  }

  getInitialAllProductRelevantReviews(count) {
    axios
      .get("/api/reviews/", {
        params: {
          product_id: this.state.currentProduct.id,
          sort: "relevant",
          count: count,
        },
      })
      .then((result) =>
        this.setState({
          modifiedReviews: result.data.results.slice(
            0,
            result.data.results.length - 1
          ),
          filters: [],
        })
      )
      .catch((err) => console.log("Error:", err));
  }

  sortChangeHandler(event) {
    let text = event.target.options[event.target.selectedIndex].text;
    let currentReviewLength = this.state.modifiedReviews.length;
    return new Promise((resolve, reject) => {
      this.setState({ reviewCount: 3, moreReviewsButtonStatus: "showEl" });
      resolve();
    })
      .then(() => {
        if (text === "relevance") {
          this.getAllProductRelevantReviews(this.state.reviewCount);
        } else if (text === "helpful") {
          this.getAllProductHelpfulReviews(this.state.reviewCount);
        } else {
          this.getAllProductNewestReviews(this.state.reviewCount);
        }
      })
      .then(() => {
        if (text === "relevance") {
          this.setState({
            modifiedReviews: this.state.allProductRelevantReviews,
          });
        } else if (text === "helpful") {
          this.setState({
            modifiedReviews: this.state.allProductHelpfulReviews,
          });
        } else {
          this.setState({
            modifiedReviews: this.state.allProductNewestReviews,
          });
        }
      });
  }

  moreReviewsClickHandler() {
    let newCount = this.state.reviewCount + 2;
    let newLength = 0;
    return new Promise((resolve, reject) => {
      this.setState({ reviewCount: newCount });
      resolve();
    })
      .then(() => {
        if (this.state.currentSort === "relevance") {
          this.getAllProductRelevantReviews(newCount);
        } else if (this.state.currentSort === "helpful") {
          this.getAllProductHelpfulReviews(newCount);
        } else {
          this.getAllProductNewestReviews(newCount);
        }
      })
      .then(() => {
        let oldLength = this.state.modifiedReviews.length;
        let btnStatus = this.state.moreReviewsButtonStatus;
      });
  }

  helpfulClickHandler(event) {
    let reviewId = event.target.closest("p").getAttribute("id");
    axios.put(`api/reviews/${reviewId}/helpful`).then((result) => {
      if (this.state.currentSort === "relevance") {
        this.getAllProductRelevantReviews(this.state.reviewCount, true);
      } else if (this.state.currentSort === "helpful") {
        this.getAllProductHelpfulReviews(this.state.reviewCount, true);
      } else {
        this.getAllProductNewestReviews(this.state.reviewCount, true);
      }
    });
  }

  addReviewClickHandler(event) {
    let modal = document.getElementById("modal-form");
    modal.classList.remove("modalOff-form");
    modal.classList.add("modalOn-form");
  }

  starFilterClickHandler(event) {
    let newFilter = event.target.innerText.substring(0, 1);
    let copy = this.state.filters;

    if (copy.includes(newFilter)) {
      let newArr = this.state.filters.filter((filter) => filter !== newFilter);
      this.setState({ filters: newArr });
    } else {
      copy.push(newFilter);
      this.setState({ filters: copy });
    }
  }

  render() {
    return (
      <div
        id='ratings-reviews-main-container'
        className='ratings-review-event module-parent'
      >
        <div id='child-ratings-reviews'>
          <h3 id='ratings-reviews-title'>RATINGS &#38; REVIEWS</h3>

          <section id='ratings-reviews-container'>
            <div id='ratings-reviews-sidebar'>
              <div>
                <RatingsBreakdown
                  product={this.state.modifiedReviews}
                  meta={this.state.allProductReviewsMeta}
                  currentProduct={this.state.currentProduct}
                  starFilterClickHandler={this.starFilterClickHandler}
                />
              </div>
              <div className='spacer'></div>
              <div>
                <ProductBreakdown
                  product={this.state.modifiedReviews}
                  meta={this.state.allProductReviewsMeta}
                  currentProduct={this.state.currentProduct}
                />
              </div>
            </div>

            <div id='ratings-reviews-list-items'>
              <div
                className={
                  this.state.modifiedReviews.length !== 0 ? "showEl" : "hideEl"
                }
              >
                <SortOptions sortChangeHandler={this.sortChangeHandler} />
              </div>

              <div id='review-list-scroll-wrapper'>
                <ReviewList
                  product={this.state.modifiedReviews}
                  meta={this.state.allProductReviewsMeta}
                  helpfulClickHandler={this.helpfulClickHandler}
                  filters={this.state.filters}
                />
                <IndividualReviewThumbnailModal />
              </div>

              <div
                id='more-reviews-button-container'
                className={this.state.moreReviewsButtonStatus}
              >
                <button
                  onClick={this.moreReviewsClickHandler}
                  className={`${this.state.moreReviewsButtonStatus} ratings-reviews-btn`}
                >
                  More Reviews
                </button>
                <button
                  onClick={this.addReviewClickHandler}
                  className='ratings-reviews-btn'
                >
                  Add A Review
                </button>
              </div>
              <AddAReview
                meta={this.state.allProductReviewsMeta}
                currentProduct={this.state.currentProduct}
                currentSort={this.state.currentSort}
                reviewCount={this.state.reviewCount}
                getAllProductRelevantReviews={this.getAllProductRelevantReviews}
                getAllProductHelpfulReviews={this.getAllProductRelevantReviews}
                getAllProductNewestReviews={this.getAllProductRelevantReviews}
              />
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default RatingsReviews;
