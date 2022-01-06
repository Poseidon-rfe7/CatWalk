import React from 'react';
import FiveStar from '../FiveStar.jsx';
import Progressbar from './Progressbar.jsx';

class RatingsBreakdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentProduct: {id: 0},
      ratings: {},
      totalRatings: 0,
      roundedAvg: 0,
      roundedAvgStarComponent: 0,
      recommend: 0
    }
  }

  componentDidUpdate(prevProps){
    if (prevProps.meta.product_id === undefined && !Array.isArray(this.props.meta)) {
      this.totalRatings()
    }
    if (!Array.isArray(this.props.meta) && prevProps.meta.product_id !== this.props.meta.product_id ) {
      this.totalRatings()
    }
  };

  static getDerivedStateFromProps(props, state) {
    if (props.currentProduct && props.currentProduct.id !== state.currentProduct.id) {
      return {
        currentProduct: props.currentProduct,
      };
    }
    return null;
  };

  totalRatings() {
    let total = 0;
    let ratingsArray = Object.values(this.props.meta.ratings);
    ratingsArray.forEach(el => total += Number(el));

    let fiveStars = Number(this.props.meta.ratings['5']) || 0
    let fourStars = Number(this.props.meta.ratings['4']) || 0
    let threeStars = Number(this.props.meta.ratings['3']) || 0
    let twoStars = Number(this.props.meta.ratings['2']) || 0
    let oneStars = Number(this.props.meta.ratings['1']) || 0
    let weightedAverage = (5 * fiveStars + 4 * fourStars + 3 * threeStars + 2 * twoStars + 1 * oneStars) / (fiveStars + fourStars + threeStars + twoStars + oneStars)

    // let weightedAverageRounded = Math.round(weightedAverage * 100) / 100;
    let weightedAverageRounded = Math.round(weightedAverage * 10) / 10;

    let weightedAverageRoundedStarComponent = (Math.round(weightedAverageRounded * 4) / 4).toFixed(2);

    let dontRecommend = Number(this.props.meta.recommended.false) || 0;
    let doRecommend = Number(this.props.meta.recommended.true) || 0;

    let recommend = (doRecommend / (dontRecommend + doRecommend)) * 100
    // let recommendedAverage = Math.round(recommend * 100) / 100;
    let recommendedAverage = Math.round(recommend);

    if (this.props.meta.ratings) {
      this.setState({ratings: this.props.meta.ratings, totalRatings: total, roundedAvg: weightedAverageRounded, roundedAvgStarComponent: weightedAverageRoundedStarComponent, recommend: recommendedAverage})
    }
  }

  render() {
    return (
      <div className='ratings-breakdown-container'>
        {/* {console.log(this.props.meta)} */}

        <div className='recommend-percentage'>
          {this.state.recommend || 0}% Recommend this product

        </div>

        <div className='average-rating-stars-container'>
          <h2>{this.state.roundedAvg || 0}</h2>
          <FiveStar rating={this.state.roundedAvgStarComponent || 0}/>
        </div>

        <div className='star-progress-bar-container'>
          <p>5 stars</p>
          <Progressbar bgcolor="rgb(22 208 83)" min={this.state.ratings['5'] || 0} max={this.state.totalRatings} height={10} width={70} showBar='true'/>
          <p className='star-progress-bar-container-total-ratings'>{this.state.ratings['5'] || 0}</p>
        </div>
        <div className='star-progress-bar-container'>
          <p>4 stars</p>
          <Progressbar bgcolor="rgb(22 208 83)" min={this.state.ratings['4'] || 0} max={this.state.totalRatings} height={10} width={70} showBar='true'/>
          <p className='star-progress-bar-container-total-ratings'>{this.state.ratings['4'] || 0}</p>
        </div>
        <div className='star-progress-bar-container'>
          <p>3 stars</p>
          <Progressbar bgcolor="rgb(22 208 83)" min={this.state.ratings['3'] || 0} max={this.state.totalRatings} height={10} width={70} showBar='true'/>
          <p className='star-progress-bar-container-total-ratings'>{this.state.ratings['3'] || 0}</p>
        </div>
        <div className='star-progress-bar-container'>
          <p>2 stars</p>
          <Progressbar bgcolor="rgb(22 208 83)" min={this.state.ratings['2'] || 0} max={this.state.totalRatings} height={10} width={70} showBar='true'/>
          <p className='star-progress-bar-container-total-ratings'>{this.state.ratings['2'] || 0}</p>
        </div>
        <div className='star-progress-bar-container'>
          <p>1 stars</p>
          <Progressbar bgcolor="rgb(22 208 83)" min={this.state.ratings['1'] || 0} max={this.state.totalRatings} height={10} width={70} showBar='true'/>
          <p className='star-progress-bar-container-total-ratings'>{this.state.ratings['1'] || 0}</p>
        </div>

      </div>
    )
  }
}

export default RatingsBreakdown;