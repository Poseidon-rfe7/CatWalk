import React from 'react';
import ProductsOverview from './ProductOverview/ProductOverView.jsx'
import QuestionsAnswers from './QuestionsAnswers/QuestionsAnswers.jsx'
import RatingsReviews from './RatingsReviews/RatingsReviews.jsx'
import RelatedProducts from './RelatedProducts/RelatedProducts.jsx'
import FiveStar from './FiveStar.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state={

      currentProduct: {},
      currentProductRating: 0,
      currentProductStyles: [],
      currentRelatedProductsIds: [],
      currentRelatedProducts: [],
      currentRelatedProductStyles: [],
      currentRelatedProductRatings: {}
    };

    this.getRelatedProductsIds = this.getRelatedProductsIds.bind(this)
    this.getSingleProductInfo = this.getSingleProductInfo.bind(this)
    this.getAllRelatedProductsInfo = this.getAllRelatedProductsInfo.bind(this)
    this.getProductStyles = this.getProductStyles.bind(this)
    this.getAllRelatedProductsStyles = this.getAllRelatedProductsStyles.bind(this)
    this.handleChangeCurrentProduct = this.handleChangeCurrentProduct.bind(this)
    this.getRating = this.getRating.bind(this)
    this.getRelatedRatings = this.getRelatedRatings.bind(this)
  }


  async handleChangeCurrentProduct(id) {
    try {
      let loadProduct = await this.getSingleProductInfo(id)
      this.setState({currentProduct: loadProduct})
      let loadStyles = await this.getProductStyles(id)
      this.setState({currentProductStyles: loadStyles})
      var rating = await this.getRating(id)
      this.setState({currentProductRating: rating})
      await this.getRelatedProductsIds(id)
      this.getAllRelatedProductsStyles(this.state.currentRelatedProductsIds)
      this.getAllRelatedProductsInfo(this.state.currentRelatedProductsIds)
      this.getRelatedRatings(this.state.currentRelatedProductsIds)
    } catch(err){
      console.log(err)
    }
  }

  async componentDidMount() {
    let response = await fetch('/api/products');
    let products = await response.json();
    let x = products[0];
    this.handleChangeCurrentProduct(x.id)

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
     return rating;
   } catch (err) {
     console.log(err)
   }
  }

  async getRelatedRatings (ids) {
      var ratings = {}
      for ( let i = 0; i < ids.length; i++) {
        ratings[ids[i]] = await this.getRating(ids[i])
      }
      for (var key in ratings) {
        if (ratings[key] === undefined) {
          ratings[key] = 0
        }
      }
      this.setState({currentRelatedProductRatings: ratings})
  }

  render() {
    return(
      <div className="app-container">
        <ProductsOverview/>

        <RelatedProducts
        relatedratings={this.state.currentRelatedProductRatings}
        currentProduct={this.state.currentProduct}
        currentproductstyles={this.state.currentProductStyles}
        relatedProducts={this.state.currentRelatedProducts}
        relatedProductStyles={this.state.currentRelatedProductStyles}
        relatedProductsIds={this.state.currentRelatedProductsIds}
        changeProducts={this.handleChangeCurrentProduct}
        />

        <QuestionsAnswers currentProduct={this.state.currentProduct} />
        <RatingsReviews currentProduct={this.state.currentProduct}/>
      </div>
    )
  }
}

export default App;