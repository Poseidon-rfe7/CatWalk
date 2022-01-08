import React from "react";
import ProductBreakdownProgressBar from "./ProductBreakdownProgressBar.jsx";

class ProductBreakdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "test",
    };
  }

  render() {
    return (
      <div>
        <ProductBreakdownProgressBar
          characteristics={this.props.meta.characteristics}
          characteristic={"Comfort"}
        />
      </div>
    );
  }
}

export default ProductBreakdown;
