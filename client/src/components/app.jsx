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
    var x = this.state.productsList[0];
    this.setState({currentProduct: x});
    await this.getRelatedProductsIds(x.id)
    await this.getAllRelatedProductsInfo(this.state.currentRelatedProductsIds)
    var y = await this.getProductStyles(x.id)
    this.setState({currentProductStyles: y})
    this.getAllRelatedProductsStyles(this.state.currentRelatedProductsIds)
  }

  async getRelatedProductsIds(productId) {
    try {
      let response = await fetch(`api/products/${productId}/related`);
      let ids = await response.json();
      this.setState({currentRelatedProductsIds: ids})
    } catch(err){
      console.log(err)
    }
  }

  async getSingleProductInfo (productId) {
    try {
      let response = await fetch(`api/products/${productId}`)
      let productInfo = await response.json();
      return productInfo ///TODO: what do i do here
    } catch(err){
      console.log(err)
    }
  }

  async getAllRelatedProductsInfo (productIds) {
    let products = [];
    productIds.map(id => {
      var x = this.getSingleProductInfo(id)
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
      var x = this.getProductStyles(id);
      styles.push(x);
    })
    let results = await Promise.all(styles);
    this.setState({currentRelatedProductStyles: results})
  }

  render() {
    return(
      <div>
        <ProductsOverview/>

        <div className="related-products-container">
        <RelatedProducts
        currentProduct={this.state.currentProduct}
        relatedProducts={this.state.currentRelatedProducts}
        relatedProductStyles={this.state.currentRelatedProductStyles}
        relatedProductsIds={this.state.currentRelatedProductsIds}
        />
        </div>

        <QuestionsAnswers />
        <RatingsReviews />
      </div>
    )
  }
}

export default App;