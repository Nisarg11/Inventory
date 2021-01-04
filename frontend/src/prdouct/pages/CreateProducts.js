import React, { Component } from 'react';
import axios from 'axios';

export default class CreateProducts extends Component {
  constructor(props) {
    super(props);

    this.onChangeitem = this.onChangeitem.bind(this);
    this.onChangetype = this.onChangetype.bind(this);
    this.onChangequantity = this.onChangequantity.bind(this);
    this.onChangeprice = this.onChangeprice.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      item: '',
      type: '',
      quantity: '',
      price: ''
    }
  }

  onChangeitem(e) {
    this.setState({
      item: e.target.value
    })
  }

  onChangetype(e) {
    this.setState({
      type: e.target.value
    })
  }

  onChangequantity(e) {
    this.setState({
      quantity: e.target.value
    })
  }

  onChangeprice(e) {
    this.setState({
      price: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const product = {
      item: this.state.item,
      type: this.state.type,
      quantity: this.state.quantity,
      price: this.state.price
    }

    console.log(product);

    axios.post(process.env.REACT_APP_BACKEND_URL +'/add', product)
      .then(res => console.log(res.data));

    this.setState({
        item: '',
        type: '',
        quantity: '',
        price: ''
    })
    window.location = '/';
  }



  render() {
    return (
      <div>
        <h3>Create New Product</h3>
        <form onSubmit={this.onSubmit}>
          <div > 
            <label>Item: </label>
            <input  type="text"
                required
                value={this.state.item}
                onChange={this.onChangeitem}
                />
          </div>
          <div > 
          <label>Type: </label>
          <input  type="text"
              required
              value={this.state.type}
              onChange={this.onChangetype}
              />
        </div>
        <div > 
        <label>Quantity: </label>
        <input  type="text"
            required
            value={this.state.quantity}
            onChange={this.onChangequantity}
            />
      </div>
      <div > 
      <label>Price: </label>
      <input  type="text"
          required
          value={this.state.price}
          onChange={this.onChangeprice}
          />
    </div>
          <div>

            <input type="submit" value="Create Product"  />
          </div>
        </form>
      </div>
    )
  }
}