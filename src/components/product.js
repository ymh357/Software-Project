import React from "react";
import style from '../css/product.module.css'

class Product extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <li className={style.card}>
                <span className={style.productImage}><img alt={"product image"} src={this.props.product.uri_large} onError={(e) => {e.target.onerror = null;e.target.src="https://pjsas.securetotecs.com/sites/pjsas/attachments/products/images_small/anotfound.png?1589769784203"}} /></span>
                <span className={style.productBasicContainer}>
                    <span className={style.productBasic}>Product ID: {this.props.product.id} </span>
                    <span className={style.productBasic}>Product Name: {this.props.product.name}</span>
                    <span className={style.productBasic}>Price: {this.props.product.price}</span>
                </span>

                <span className={style.productCustomizeContainer}>
                    <span className={style.productCustomize}>Total Price: {`${+this.props.product.price * +this.props.product.quantity}`}</span>

                    <span className={style.productCustomize}>
                        {this.props.edit && <span><button onClick={(e)=>{this.props.toReduce(
                            this.props.product.barcode
                        )}}>-</button></span>}
                        <button disabled>Quantity: {this.props.product.quantity}</button>
                        {this.props.edit && <span><button onClick={(e)=>{this.props.toAdd(
                            this.props.product.barcode
                        )}}>+</button></span> }
                    </span>

                </span>



            </li>
        )
    }
}


export default Product