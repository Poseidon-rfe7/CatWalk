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
      currentProductStyles: [],
      currentRelatedProductsIds: [],
      currentRelatedProducts: [],
      currentRelatedProductStyles: []
    };
    this.refreshProducts = this.refreshProducts.bind(this)
    this.getRelatedProductsIds = this.getRelatedProductsIds.bind(this)
    this.getSingleProductInfo = this.getSingleProductInfo.bind(this)
    this.getAllRelatedProductsInfo = this.getAllRelatedProductsInfo.bind(this)
    this.getProductStyles = this.getProductStyles.bind(this)
    this.getAllRelatedProductsStyles = this.getAllRelatedProductsStyles.bind(this)
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
      this.setState({currentProduct: x});
      this.getRelatedProductsIds(x.id, ()=>{
       this.getAllRelatedProductsInfo(this.state.currentRelatedProductsIds)
        this.getProductStyles(x.id, (result) => {
          this.setState({currentProductStyles: result.data})
          this.getAllRelatedProductsStyles(this.state.currentRelatedProductsIds)
        })
      })
    })
  }


  getRelatedProductsIds(productId, callback) {
    axios.get(`api/products/${productId}/related`)
      .then(result => this.setState({
        currentRelatedProductsIds: result.data
      }))
      .then(()=> {callback()})
      .catch(err => console.log(err))
  }

  getSingleProductInfo (productId, callback) {
     axios.get(`api/products/${productId}`)
      .then(result =>  callback(result))
      .catch(err => console.log(err))
  }

  getAllRelatedProductsInfo (productIds) {
    let products = [];
    productIds.map(id => {
      this.getSingleProductInfo(id, (result)=> {
        products.push(result.data)
      })
    })
    this.setState({currentRelatedProducts: products})
  }

  getProductStyles(productId, callback) {
     axios.get(`api/products/${productId}/styles`)
      .then(result =>  callback(result))
      .catch(err => console.log(err))
  }

  getAllRelatedProductsStyles(productIds) {
    let styles = [];
    productIds.map(id => {
      this.getProductStyles(id, (result)=> {
        styles.push(result.data)
      })
    })
    this.setState({currentRelatedProductStyles: styles})
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