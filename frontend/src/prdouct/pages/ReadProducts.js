import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Product= props => (
  <tr>
    <td>{props.product.item}</td>
    <td>{props.product.type}</td>
    <td>{props.product.quantity}</td>
    <td>{props.product.price}</td>
    <td>
      <Link to={"/edit/"+props.product._id}>edit</Link> | <a href="/" onClick={() => { props.deleteProduct(props.product._id) }}>delete</a>
    </td>
  </tr>
)

export default class ReadProducts extends Component {
  constructor(props) {
    super(props);

    this.deleteProduct = this.deleteProduct.bind(this)

    this.state = {products: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/api/products/all/all')
      .then(response => {
        this.setState({ products: response.data })
      
      })
      .catch((error) => {
        console.log(error);
      })
      
  }

  deleteProduct(id) {
    axios.delete('http://localhost:5000/api/products/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      products: this.state.products.filter(el => el._id !== id)
    })
    console.log('products');
  }



  productList() {
    return this.state.products.map((currentproduct) => {
      return <Product product={currentproduct} deleteProduct={this.deleteProduct} key={currentproduct._id}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>Logged Products</h3>
        <table >
          <thead >
            <tr>
              <th>Item</th>
              <th>Type</th>
              <th>Quantity</th>
              <th>Price</th>
    
            </tr>
          </thead>
          <tbody>
            { this.productList() }
          </tbody>
        </table>
      </div>
    )
  }
}
