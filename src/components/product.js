import React from "react";
import style from '../css/product.module.css'

class Product extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <li className={style.card}>
                <span>Product ID: {this.props.product.id} </span>
                <span>Product Name: {this.props.product.name}</span>
                <span>Quantity: {this.props.product.quantity}</span>
                <span>Price: {this.props.product.price}</span>
                <span>Total: {`${+this.props.product.price * +this.props.product.quantity}`}</span>
                {this.props.edit && <span><button onClick={(e)=>{this.props.toReduce(
                    this.props.product.id
                )}}>-</button> <button onClick={(e)=>{this.props.toAdd(
                    this.props.product.id
                )}}>+</button></span> }
            </li>
        )
    }
}


export default Product