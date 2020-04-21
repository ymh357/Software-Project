import React, { Component } from 'react';
import { Title } from '../components/Title'
import {ScanForm} from '../components/ScanForm'
import { ProductsList } from '../components/ProductsList'
import {withRouter} from 'react-router-dom'

import './Cart.css';
import 'bulma/css/bulma.css'


class Cart extends Component {
 
  state = { results: [] }

  _handleResults = (results) => {
    this.setState({results})
  }

  render() {
    return (
      
      <div className="Cart">
        <Title> Shopping cart </Title> 
        <div className='ScanForm-wrapper'>
          <ScanForm onResults={this._handleResults} />
        </div>
        {this.state.results.length === 0
          ? <p> Item not found </p>
          : <ProductsList products = {this.state.results} />
        }
      </div>
    );
  }
}

export default withRouter(Cart);
 