import React from 'react';
import StarRating from './StarRating.jsx';

class AddAReview extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      rating: null,
      hover: null,
    }
    this.starClickHandler = this.starClickHandler.bind(this);
    this.starMouseEnter = this.starMouseEnter.bind(this);
    this.starMouseLeave = this.starMouseLeave.bind(this);
  }

  starClickHandler(ratingValue) {
    this.setState({rating: ratingValue})
  }

  starMouseEnter(ratingValue) {
    this.setState({hover: ratingValue})
  }

  starMouseLeave() {
    this.setState({hover: null})
  }

  render() {
    return (
      <div className="add-review-container">
        <form action="action_page.php">

        <div className="row">
          <label>* Required</label>
        </div>

        <div className="row">
            <div className="col-26">
              <div className='row-inner-container'>
                <h2>Write Your Review</h2>
                <h3>About the [Product Name Here]</h3>
              </div>
            </div>
        </div>

        <div className="row">
            <div className="col-26">
              <div className='row-inner-container'>
                <label htmlFor="review-summary" >*Overall rating</label>
                <StarRating
                rating={this.state.rating}
                hover={this.state.hover}
                starClickHandler={this.starClickHandler}
                starMouseEnter={this.starMouseEnter}
                starMouseLeave={this.starMouseLeave}
                />
                <label>1-Poor 2-Fair 3-Average 4-Good 5-Great</label>
              </div>

              <div className='row-inner-container'>
                <div className="item">
                  <div className="item-inner">
                    <label htmlFor="fname">* Do you recommend this product?</label>
                    <div className="characteristic-radios">
                      <div className='radio-container'>
                        <div className='radio-input-container'>
                          <input type="radio" name="recommend" value="yes" /> <span>yes</span>
                        </div>
                        <div className='radio-input-container'>
                          <input type="radio" name="recommend" value="no" /> <span>no</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <div className="row">
            <div className="characteristic-title">
              <label htmlFor="characteristic">*[characteristic]</label>
            </div>
            <div className="characteristic-radios">
              <div className='radio-container'>
                <div className='radio-input-container shrink-radio'>
                  <input type="radio" name="characteristics" value="A size too small" /> <span>A size too small</span>
                </div>
                <div className='radio-input-container shrink-radio'>
                  <input type="radio" name="characteristics" value="½ a size too small" /> <span>½ a size too small</span>
                </div>
                <div className='radio-input-container shrink-radio'>
                  <input type="radio" name="characteristics" value="Perfect" /> <span>Perfect</span>
                </div>
                <div className='radio-input-container shrink-radio'>
                  <input type="radio" name="characteristics" value="½ a size too big" /> <span>½ a size too big</span>
                </div>
                <div className='radio-input-container shrink-radio'>
                  <input type="radio" name="characteristics" value="A size too wide" /> <span>A size too wide</span>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-26">
              <div className='row-inner-container'>
                <label htmlFor="review-summary" >Review Summary</label>
                <textarea className='shrink-right' name="review-summary" placeholder="Write something.." />
              </div>

              <div className='row-inner-container'>
                <div className="item">
                  <div className="item-inner">
                    <label htmlFor="fname">*Nickname</label>
                    <input type="text" id="fname" name="nickname" placeholder="Nickname" className='shrink-left'/>
                  </div>
                </div>
                <div className="item-inner">
                  <label htmlFor="fname">*Email Address</label>
                  <input type="text" id="fname" name="nickname" placeholder="Email Address" className='shrink-left'/>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-26">
              <div className='row-inner-container'>
                <label htmlFor="review-summary" >*Your Review</label>
                <textarea name="review-summary" placeholder="Write something.." rows="6"/>
              </div>
            </div>
          </div>

          <div className="row">
            <button id='upload-btn'><i className="fas fa-arrow-alt-from-bottom"></i> Upload</button>
          </div>

          <div className="row">
            <input type="submit" value="Submit" />
          </div>

          <div className="row">
            <StarRating />
          </div>

        </form>
      </div>
    )
  }
}

  export default AddAReview;


/*
To Use: import and place where you need, just pass down the rating as a prop rating={'rating'}
ex: <FiveStar rating={2.7}/>
*/