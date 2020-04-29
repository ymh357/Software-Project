import React from "react";
import {withRouter} from 'react-router-dom'
import Product from './product'
import style from '../css/current_order.css'

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
                {this.props.edit && <button onClick={this._handleClick}>Order ID: {this.props.order.id}</button>}
                {!this.props.edit && `Order ID: ${this.props.order.id}`}
                Products :
                <ul className={style.cardContainer}>
                    {
                        this.props.order.products.map(product =>
                            <Product product = {product} key={product.id}></Product>
                        )
                    }
                </ul>
                Total Price: {this.props.order.products.reduce((acc , cur)=>{
                    return acc + (cur.price * cur.quantity)
                }, 0)}
            </li>
        )
    }
}

export default withRouter(Order)