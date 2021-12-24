import React from 'react';
import ProductsOverview from './ProductOverview/ProductOverView.jsx'
import QuestionsAnswers from './QuestionsAnswers/QuestionsAnswers.jsx'
import RatingsReviews from './RatingsReviews/RatingsReviews.jsx'
import RelatedItems from './RelatedItems/RelatedItems.jsx'
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      productsList: [],
      currentProduct: [],
      currentRelatedProductsIds: [],
      currentRelatedProducts: []
    };
  }

  handleChangeCurrentProduct() {
    null
    // set a new product ( whatever user has clicked on)
    // also needs to trigger new related products, etc..
  }

  refreshProducts (callback) {
    axios.get('/api/products')
      .then(result => this.setState({
        productsList: result.data
      }))
      .then(()=> {callback()})
      .catch(err => console.log(err))
  }

  componentDidMount() {
    this.refreshProducts(() => {
      var x = this.state.productsList[0];
      console.log(x.id)
      this.setState({currentProduct: x});
      this.getRelatedProductsIds(x.id, ()=>{
        this.getAllRelatedProductsInfo(this.state.currentRelatedProductsIds)
      })
    })
  }

  //when calling this for ids you might want to get related products
  //at the same time so you could do so with an optional callback?
  getRelatedProductsIds(productId, callback) {
    axios.get(`api/products/${productId}/related`)
      .then(result => this.setState({
        currentRelatedProductsIds: result.data
      }))
      .then(()=> {callback()})
      .catch(err => console.log(err))
  }

  getSingleProductInfo (productId, callback) {
    return axios.get(`api/products/${productId}`)
      .then(result =>  callback(result)) //may need to change
      .catch(err => console.log(err))
  }

  getAllRelatedProductsInfo (...productIds) {
    //map over related product ids. calling getsingle product info handler for each one
    let products = [];
    this.state.currentRelatedProductsIds.map(id => {
      this.getSingleProductInfo(id, (result)=> {
        products.push(result.data)
      })
    })
    this.setState({currentRelatedProducts: products})
  }


  render() {
    return(
      <div>
        <ProductsOverview/>
        <RelatedItems/>
        <QuestionsAnswers />
        <RatingsReviews />
      </div>
    )
  }
}

export default App;