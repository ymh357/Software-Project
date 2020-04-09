import React from "react";
class Product extends React.Component {

    render() {
        return (
            <li>
                Product ID: {this.props.product.id}
                Product Name: {this.props.product.name}
                Quantity: {this.props.product.quantity}
                {this.props.edit && <button onClick={(e)=>{this.props.toReduce(
                    this.props.product.id
                )}}>-</button> }
                {this.props.edit && <button onClick={(e)=>{this.props.toAdd(
                    this.props.product.id
                )}}>+</button> }
            </li>
        )
    }
}


export default Product