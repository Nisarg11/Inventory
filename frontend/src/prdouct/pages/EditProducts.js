import React, { Component } from 'react';
import axios from 'axios';

export default class EditProducts extends Component {
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
  
    componentDidMount() {
      axios.get(process.env.REACT_APP_BACKEND_URL +'/'+  this.props.match.params.id)
        .then(response => {
          this.setState({
            item: response.data.product.item,
            type: response.data.product.type,
            quantity: response.data.product.quantity,
            price: response.data.product.price
          })   
        })
        .catch(function (error) {
          console.log(error);
        })
  
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
  
      axios.patch(process.env.REACT_APP_BACKEND_URL +'/' + this.props.match.params.id, product)
        .then(res => console.log(res.data));
  
      window.location = '/';
    }
  
    render() {
      return (
      <div>
        <h3>Edit Product</h3>
        <form onSubmit={this.onSubmit}>
          <div> 
            <label>Item: </label>
            <input  type="text"
            required
            value={this.state.item}
            onChange={this.onChangeitem}
            />
         </div>
          <div> 
            <label>Type: </label>
            <input  type="text"
                required
                value={this.state.type}
                onChange={this.onChangetype}
                />
          </div>
          <div>
            <label>Quantity </label>
            <input 
                type="text" 
                required
                value={this.state.quantity}
                onChange={this.onChangequantity}
                />
          </div>
          <div>
            <label>Price </label>
            <input
                type="text"
                required
                value={this.state.price}
                onChange={this.onChangeprice}
              />
            </div>
  
          <div >
            <input type="submit" value="Edit Product" />
          </div>
        </form>
      </div>
      )
    }
  }