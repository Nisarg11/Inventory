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
    axios.get(process.env.REACT_APP_BACKEND_URL +'/all/all')
      .then(response => {
        this.setState({ products: response.data.product })
      
      })
      .catch((error) => {
        console.log(error);
      })
      
  }

  deleteProduct(id) {
    axios.delete(process.env.REACT_APP_BACKEND_URL +'/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      products: this.state.products.filter(el => el._id !== id)
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
            { 
            // eslint-disable-next-line 
              this.state.products.map((currentproduct,index) => {
               return <Product product={currentproduct} deleteProduct={this.deleteProduct} key={index} />
            })
          }
              </tbody>
        </table>
      </div>
    );
  }
}
