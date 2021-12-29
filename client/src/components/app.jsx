import React from 'react';
import ProductsOverview from './ProductOverview/ProductOverView.jsx'
import QuestionsAnswers from './QuestionsAnswers/QuestionsAnswers.jsx'
import RatingsReviews from './RatingsReviews/RatingsReviews.jsx'
import RelatedProducts from './RelatedProducts/RelatedProducts.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      productsList: [],
      currentProduct: {},
      currentProductRating: 0,
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
    this.handleChangeCurrentProduct = this.handleChangeCurrentProduct.bind(this)
    this.getRating = this.getRating.bind(this)
  }

  async handleChangeCurrentProduct(id) {
    try {
      let loadProduct = await this.getSingleProductInfo(id)
      this.setState({currentProduct: loadProduct})
      let loadStyles = await this.getProductStyles(id)
      this.setState({currentProductStyles: loadStyles})
      this.getRating(id)
      await this.getRelatedProductsIds(id)
      this.getAllRelatedProductsStyles(this.state.currentRelatedProductsIds)
      this.getAllRelatedProductsInfo(this.state.currentRelatedProductsIds)
    } catch(err){
      console.log(err)
    }
  }

  async  refreshProducts () {
    try{
      let response = await fetch('/api/products');
      let products = await response.json();
      this.setState({productsList: products})
    } catch(err){
      console.log(err)
    }
  }

  async componentDidMount() {
    await this.refreshProducts()
    let x = this.state.productsList[0];
    this.setState({currentProduct: x});
    let y = await this.getProductStyles(x.id)
    this.setState({currentProductStyles: y})
    this.getRating(x.id)
    await this.getRelatedProductsIds(x.id)
    this.getAllRelatedProductsInfo(this.state.currentRelatedProductsIds)
    this.getAllRelatedProductsStyles(this.state.currentRelatedProductsIds)
  }

  async getRelatedProductsIds(productId) {
    try {
      let response = await fetch(`api/products/${productId}/related`);
      let ids = await response.json();
      for (let i = 0; i < ids.length; i++) {
        if (ids.indexOf(ids[i], i+1 ) > 0) {
          ids.splice(i, 1)
        }
      }
      this.setState({currentRelatedProductsIds: ids})
    } catch(err){
      console.log(err)
    }
  }

  async getSingleProductInfo (productId) {
    try {
      let response = await fetch(`api/products/${productId}`)
      let productInfo = await response.json();
      return productInfo
    } catch(err){
      console.log(err)
    }
  }

  async getAllRelatedProductsInfo (productIds) {
    let products = [];
    productIds.map(id => {
      let x = this.getSingleProductInfo(id)
      products.push(x)
    })
    let results = await Promise.all(products)
    this.setState({currentRelatedProducts: results})
  }

  async getProductStyles(productId) {
    try {
      let response = await fetch(`api/products/${productId}/styles`)
      let productStyles = await response.json();
      return productStyles
    } catch(err){
      console.log(err)
    }
  }

  async getAllRelatedProductsStyles(productIds) {
    let styles = [];
    productIds.map(id => {
      let x = this.getProductStyles(id);
      styles.push(x);
    })
    let results = await Promise.all(styles);
    this.setState({currentRelatedProductStyles: results})
  }

  async getRating (id) {
   try {
     let response = await fetch(`api/reviews/?product_id=${id}`)
     let reviews = await response.json()
     reviews = reviews.results
     let rating = reviews[0].rating;
     for (let i = 1; i < reviews.length; i++) {
       rating += reviews[i].rating
     }
     rating = rating / reviews.length
     this.setState({currentProductRating: rating})
   } catch (err) {
     console.log(err)
   }
  }

  render() {
    return(
      <div className="app-container">
        <ProductsOverview/>

        <RelatedProducts
        currentProduct={this.state.currentProduct}
        currentproductstyles={this.state.currentProductStyles}
        relatedProducts={this.state.currentRelatedProducts}
        relatedProductStyles={this.state.currentRelatedProductStyles}
        relatedProductsIds={this.state.currentRelatedProductsIds}
        changeProducts={this.handleChangeCurrentProduct}
        />

        <QuestionsAnswers />
        <RatingsReviews />
      </div>
    )
  }
}

export default App;