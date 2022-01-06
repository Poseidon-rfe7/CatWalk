import React from 'react';
import StarRating from './StarRating.jsx';
import Characteristics from './Characteristics.jsx';
import axios from 'axios';

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
      nickname: '',
      email: '',
      photos: [],
      summaryValid: false,
      bodyValid: false,
      nicknameValid: false,
      emailValid: false,
      uploads: []

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
    this.submitClickHandler = this.submitClickHandler.bind(this);
    this.onImageChange = this.onImageChange.bind(this);
    this.formModalCloseClickHandler = this.formModalCloseClickHandler.bind(this);
    this.resetForm = this.resetForm.bind(this);
    this.radioTracker = this.radioTracker.bind(this);
    this.getFile = this.getFile.bind(this);

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
    this.setState({recommend: false})
  }

  summaryChangeHandler(event) {
    let text = event.target.value;
    if (text.length > 60) {
      this.setState({summary: event.target.value, summaryValid: false})
    } else {
      this.setState({summary: event.target.value, summaryValid: true})
    }
  }

  bodyChangeHandler(event) {
    let text = event.target.value;
    if (text.length < 50 || text.length > 1000) {
      this.setState({body: event.target.value, bodyValid: false})
    } else {
      this.setState({body: event.target.value, bodyValid: true})
    }
  }

  nicknameChangeHandler(event) {
    let text = event.target.value;
    if (text.length > 60) {
      this.setState({nickname: event.target.value, nicknameValid: false})
    } else {
      this.setState({nickname: event.target.value, nicknameValid: true})
    }
  }

  emailChangeHandler(event) {
    let text = event.target.value;
    if (text.length > 60) {
      this.setState({email: event.target.value, emailValid: false})
    } else {
      this.setState({email: event.target.value, emailValid: true})
    }
  }

  characteristicClickHandler(event) {
    let name = event.target.getAttribute('name');
    let id = event.target.getAttribute('charid');
    let rating = event.target.getAttribute('rating');
    let current = this.state.characteristics
    this.setState({characteristics: {...current, [id]: Number(rating)}})
  }

  radioTracker(characteristic) {
    let current = this.state.radios
    this.setState({radios: {...current, [characteristic]: false}})
  }

  submitClickHandler(event) {
    event.preventDefault();
    let params = {
      product_id: this.state.currentProduct.id,
      rating: this.state.rating,
      summary: this.state.summary,
      body: this.state.body,
      recommend: this.state.recommend,
      name: this.state.nickname,
      email: this.state.email,
      photos: this.state.photos,
      characteristics: this.state.characteristics,
    }

    let radios = document.getElementsByClassName('characteristic-radios')
    let inputs = document.getElementsByTagName('input')
    let checked = 0;
    for (var i = 0; i < inputs.length; i++) {
      if(inputs[i].checked) {
        checked += 1;
      }
    }

    if (!this.state.summaryValid || !this.state.bodyValid || !this.state.nicknameValid || !this.state.emailValid || !this.state.rating || checked !== radios.length + 1) {
      alert('missing required')
    } else {
      this.resetForm();

      axios.post(`api/reviews`, params)
      .then((result) => {
        console.log('>>>>good', result)
        if (this.props.currentSort === 'relevance') {
          this.props.getAllProductRelevantReviews(this.props.reviewCount, true);
        } else if (this.props.currentSort === 'helpful') {
          this.props.getAllProductHelpfulReviews(this.props.reviewCount, true);
        } else {
          this.props.getAllProductNewestReviews(this.props.reviewCount, true);
        }
      })
      .catch((result) => {
        console.log('>>>bad', result)
      })
    }
  }

  onImageChange(event) {
    let images = Array.from(event.target.files)

    if (images.length > 5 || this.state.photos.length + images.length > 5) {
      alert(`Only 5 files are allowed.`);
      return;
  }

  let currentUploads = this.state.uploads;

    if (event.target.files && event.target.files[0]) {
      images.forEach((img) => {
        // let newUploads = [...currentUploads, img.name]
        currentUploads.push(img.name)
        let current = this.state.photos;
        current.push(URL.createObjectURL(img))
        this.setState({photos: current});
      })
    }
    this.setState({uploads: currentUploads})
  };

  getFile() {
    document.getElementById("file-input").click();
  }

  formModalCloseClickHandler(event) {
    event.preventDefault();
    this.resetForm();
    let modal = document.getElementById('modal-form');
    modal.classList.remove('modalOn-form')
    modal.classList.add('modalOff-form')
  }

  resetForm() {
    var a = [];
    a = document.getElementsByTagName('input');
    for (var b = 0; b < a.length; b++) {
      if(a[b].type === 'radio') {
        a[b].checked = false;
      }
    }

    this.setState({
      currentProduct: {id: 0, name: ''},
      rating: null,
      hover: null,
      recommend: null,
      characteristics: {},
      summary: '',
      body: '',
      nickname: '',
      email: '',
      photos: [],
    })
  }

  render() {
    return (
    <div id="modal-form" className="modal-form modalOff-form">
      <div className="add-review-container modal-content-form">
        <form action="action_page.php">

        <div className="row">
          <label>* Required</label>
        </div>

        <div className="row">
            <div className="col-26">
              <div className='row-inner-container'>
                <h2 id='write-your-review-title'>Write Your Review</h2>
                <h3 id='write-your-review-sub'>About the {this.props.currentProduct.name}</h3>
              </div>
            </div>
        </div>

        <div className="row">
            <div className="col-26">
              <div className='row-inner-container'>
                <label htmlFor="review-summary" className='row-inner-elements'>*Overall rating</label>
                <StarRating
                rating={this.state.rating}
                hover={this.state.hover}
                starClickHandler={this.starClickHandler}
                starMouseEnter={this.starMouseEnter}
                starMouseLeave={this.starMouseLeave}
                />
                <label className='row-inner-elements'>1-Poor 2-Fair 3-Average 4-Good 5-Great</label>
              </div>

              <div className='row-inner-container'>
                <div className="item">
                  <div className="item-inner">
                    <label htmlFor="fname" className='row-inner-elements'>* Do you recommend this product?</label>
                    <div className="characteristic-radios row-inner-elements">
                      <div className='radio-container'>
                        <div className='radio-input-container'>
                          <input type="radio" name="recommend" value="yes" onClick={this.yesRadioClickHandler} className='row-inner-elements'/> <span>Yes</span>
                        </div>
                        <div className='radio-input-container'>
                          <input type="radio" name="recommend" value="no" onClick={this.noRadioClickHandler} className='row-inner-elements' /> <span>No</span>
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
            characteristicClickHandler={this.characteristicClickHandler}
            radioTracker={this.radioTracker}/>

          <div className="row row-inner-elements">
            <div className="col-26">
              <div className='row-inner-container'>
                <label htmlFor="review-summary" className='row-inner-elements'>*Review Summary</label>
                <textarea className='shrink-right row-inner-elements' name="review-summary" placeholder="Example: Best purchase ever!" minLength="1"  maxLength="60"value={this.state.summary} onChange={this.summaryChangeHandler}/>
              </div>

              <div className='row-inner-container'>
                <div className="item">
                  <div className="item-inner">
                    <label htmlFor="fname" className='row-inner-elements'>*Nickname</label>
                    <input type="text" id="fname" name="nickname" placeholder="Example: jackson11!" className='shrink-left row-inner-elements input-tag' minLength="1" maxLength="60" value={this.state.nickname || ''} onChange={this.nicknameChangeHandler}/>
                  </div>
                </div>
                <div className="item-inner">
                  <label htmlFor="fname" className='row-inner-elements'>*Email Address</label>
                  <input type="text" id="fname" name="nickname" placeholder="Example: jackson11@email.com" className='shrink-left row-inner-elements input-tag' minLength="1" maxLength="60" value={this.state.email} onChange={this.emailChangeHandler}/>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-26">
              <div className='row-inner-container'>
                <label htmlFor="review-summary" className='row-inner-elements'>*Your Review</label>
                <textarea name="review-summary" placeholder="Why did you like the product or not?" rows="6" minLength="50" maxLength="1000" value={this.state.body} onChange={this.bodyChangeHandler} className='row-inner-elements'/>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="image-upload-container">
                <label htmlFor="file-upload" className="custom-file-upload" onClick={this.getFile}>Upload Photos</label>
                <input type="file" id="file-input" name="ImageStyle" multiple accept="image/png, image/jpeg" onChange={this.onImageChange} />
                <div>{this.state.uploads.join(', ') || ''}</div>
            </div>
          </div>

          <div className="row form-buttons">
            <button onClick={this.formModalCloseClickHandler}className='form-btn'>Cancel</button>
            <input type="submit" value="Submit" onClick={this.submitClickHandler} className='form-btn'/>
          </div>

        </form>
      </div>
    </div>
    )
  }
}

  export default AddAReview;