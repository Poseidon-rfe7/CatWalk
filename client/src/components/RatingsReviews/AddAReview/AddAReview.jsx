import React from 'react';
import StarRating from './StarRating.jsx';
import Characteristics from './Characteristics.jsx';

class AddAReview extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentProduct: {id: 0},
      rating: null,
      hover: null,
      recommend: null,
      characteristics: {},
      summary: '',
      body: '',
      name: '',
      email: '',
      photos: ''
    }
    this.starClickHandler = this.starClickHandler.bind(this);
    this.starMouseEnter = this.starMouseEnter.bind(this);
    this.starMouseLeave = this.starMouseLeave.bind(this);
    this.yesRadioClickHandler = this.yesRadioClickHandler.bind(this);
    this.noRadioClickHandler = this.noRadioClickHandler.bind(this);
    this.characteristicClickHandler = this.characteristicClickHandler.bind(this);
    this.summaryChangeHandler = this.summaryChangeHandler.bind(this);
    this.bodyChangeHandler = this.bodyChangeHandler.bind(this);
    this.nicknameChangeHandler = this.nicknameChangeHandler.bind(this);
    this.emailChangeHandler = this.emailChangeHandler.bind(this);

  }

  static getDerivedStateFromProps(props, state) {
    if (props.currentProduct && props.currentProduct.id !== state.currentProduct.id) {
      return {
        currentProduct: props.currentProduct,
      };
    }
    return null;
  };

  starClickHandler(ratingValue) {
    this.setState({rating: ratingValue})
  }

  starMouseEnter(ratingValue) {
    this.setState({hover: ratingValue})
  }

  starMouseLeave() {
    this.setState({hover: null})
  }

  yesRadioClickHandler() {
    this.setState({recommend: true})
  }

  noRadioClickHandler() {
    console.log('here', this)
    this.setState({recommend: false})
  }

  summaryChangeHandler(event) {
    this.setState({summary: event.target.value})
  }

  bodyChangeHandler(event) {
    this.setState({body: event.target.value})
  }

  nicknameChangeHandler(event) {
    this.setState({nickname: event.target.value})
  }

  emailChangeHandler(event) {
    this.setState({email: event.target.value})
  }

  characteristicClickHandler(event) {
    let name = event.target.getAttribute('name');
    let id = event.target.getAttribute('charid');
    let rating = event.target.getAttribute('rating');
    let current = this.state.characteristics
    this.setState({characteristics: {...current, [id]: rating}})
  }

  render() {
    return (
    <div id="modal-form" className="modal-form modalOn-form">
      <div className="add-review-container modal-content-form">
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
                          <input type="radio" name="recommend" value="yes" onClick={this.yesRadioClickHandler}/> <span>yes</span>
                        </div>
                        <div className='radio-input-container'>
                          <input type="radio" name="recommend" value="no" onClick={this.noRadioClickHandler}/> <span>no</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <Characteristics
            meta={this.props.meta}
            product={this.props.currentProduct}
            characteristicClickHandler={this.characteristicClickHandler} />

          <div className="row">
            <div className="col-26">
              <div className='row-inner-container'>
                <label htmlFor="review-summary" >Review Summary</label>
                <textarea className='shrink-right' name="review-summary" placeholder="Write something.." onChange={this.summaryChangeHandler}/>
              </div>

              <div className='row-inner-container'>
                <div className="item">
                  <div className="item-inner">
                    <label htmlFor="fname">*Nickname</label>
                    <input type="text" id="fname" name="nickname" placeholder="Nickname" className='shrink-left' onChange={this.nicknameChangeHandler}/>
                  </div>
                </div>
                <div className="item-inner">
                  <label htmlFor="fname">*Email Address</label>
                  <input type="text" id="fname" name="nickname" placeholder="Email Address" className='shrink-left' onChange={this.emailChangeHandler}/>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-26">
              <div className='row-inner-container'>
                <label htmlFor="review-summary" >*Your Review</label>
                <textarea name="review-summary" placeholder="Write something.." rows="6" onChange={this.bodyChangeHandler}/>
              </div>
            </div>
          </div>

          <div className="row">
            <button id='upload-btn'><i className="fas fa-arrow-alt-from-bottom"></i> Upload</button>
          </div>

          <div className="row">
            <input type="submit" value="Submit" />
          </div>

        </form>
      </div>
      </div>
    )
  }
}

  export default AddAReview;


/*
To Use: import and place where you need, just pass down the rating as a prop rating={'rating'}
ex: <FiveStar rating={2.7}/>
*/


/*

    product_id: review.product_id,
    rating: review.rating,
    summary: review.summary,
    body: review.body,
    recommend: review.recommend,
    name: review.name,
    email: review.email,
    photos: review.photos,
    characteristics: review.characteristics,


    {
    "Size": {
      "id": 14,
      "value": "4.0000"
    },
     "Width": {
      "id": 15,
      "value": "3.5000"
    },
    "Comfort": {
      "id": 16,
      "value": "4.0000"
    },
*/