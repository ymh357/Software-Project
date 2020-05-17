import React from "react";
import {withRouter} from 'react-router-dom'
import Product from './product'
import style from '../css/order.css'

class Order extends React.Component{
    constructor(props) {
        super(props);
        this._handleClick = this._handleClick.bind(this)
    }

    _handleClick(e){
        e.preventDefault()
        const path =  `order${this.props.order.id}`
        this.props.history.push(path)
    }

    render() {
        return (
            <li className={style.order}>
                <h1>{this.props.edit && <button onClick={this._handleClick}>Order ID: {this.props.order.id}</button>}{!this.props.edit && `Order ID: ${this.props.order.id}`}</h1>
                <h2>Products :</h2>
                <ul className={style.cardContainer}>
                    {
                        this.props.order.products.map(product =>
                            <Product product = {product} key={product.id}/>
                        )
                    }
                </ul>
            </li>
        )
    }
}

export default withRouter(Order)