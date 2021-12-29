import React from 'react';
import IndividualReviewThumbnails from './IndividualReviewThumbnails.jsx';

class IndividualReviewBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentBody: props.body,
      firstChars: props.body.substring(0, 250),
      lastChars: props.body.substring(250),
      isLong: false,
      photos: props.photos,
      // photos: ['https://picsum.photos/300/200', 'https://picsum.photos/300/200', 'https://picsum.photos/300/200', 'https://picsum.photos/300/200', 'https://picsum.photos/300/200'],
      reviewId: props.reviewId,
      show: 'Show more',
      body: props.body.substring(0, 250)
    };
    this.showMoreClickHandler = this.showMoreClickHandler.bind(this);
    this.modalClickHandler = this.modalClickHandler.bind(this);
    this.modalCloseClickHandler = this.modalCloseClickHandler.bind(this);
  }

  showMoreClickHandler(event) {
    event.preventDefault();
    if (this.state.isLong) {
      // event.target.previousElementSibling.innerText = this.state.firstChars
      this.state.isLong = !this.state.isLong;
      this.setState({body: this.state.firstChars, show: 'Show more'})
    } else {
      // event.target.previousElementSibling.innerText = this.state.currentBody
      this.state.isLong = !this.state.isLong;
      this.setState({body: this.state.currentBody, show: 'Show less'})
    }
  }

  modalCloseClickHandler(event) {
    let modal = document.getElementById('modal');
    modal.classList.remove('modalOn')
    modal.classList.add('modalOff')
  }

  modalClickHandler(event) {
    let url = event.target.getAttribute('src');
    let modal = document.getElementById('modal');
    let modalImage = document.getElementById('modal-image');
    modalImage.src = url;
    modal.classList.remove('modalOff')
    modal.classList.add('modalOn')
  }

  render() {
    return (
      <div className='individual-review-body-container'>
        <p className="word-wrap">{this.state.body}</p>
        <IndividualReviewThumbnails
          photos= {this.state.photos}
          reviewId={this.state.reviewId}
          modalClickHandler={this.modalClickHandler}
          modalCloseClickHandler={this.modalCloseClickHandler}
        />
        <a href='#'
          onClick={this.showMoreClickHandler}
          className={this.state.lastChars === '' ? 'hideEl' : 'showEl'}
          >{this.state.show}
        </a>
      </div>
    )
  }
}

export default IndividualReviewBody;

