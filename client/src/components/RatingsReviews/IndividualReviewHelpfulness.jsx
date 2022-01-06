import React from 'react';
import ls from 'local-storage';

class IndividualReviewHelpfulness extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
      marked: []
    }
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler(event) {
    let markedReviews = ls.get('markedReviews') || [];
    if (!markedReviews.includes(this.props.review.review_id)) {
      this.props.helpfulClickHandler(event)
    }
    ls.set('markedReviews', [...markedReviews, this.props.review.review_id]);
  }

  render() {
    return (
      <div className='helpful-container'>
        <p id={this.props.review.review_id} onClick={this.clickHandler} >Helpful? <span className='helpful'>Yes ({this.props.review.helpfulness})</span></p> <span> &nbsp;| Report</span>
      </div>
    )
  }
}

export default IndividualReviewHelpfulness;