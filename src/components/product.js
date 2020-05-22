import React from "react";
import style from '../css/product.module.css'

class Product extends React.Component {

    constructor(props) {
        super(props);

        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        // this.setState({value: event.target.value});
        let quantity = e.target.quantity
        this.setState({
            [quantity]: e.target.value
        })
      }

    render() {
        return (
            <li >
                <span className={style.productImage}><img alt={"product image"} src={this.props.product.uri_large} onError={(e) => {e.target.onerror = null;e.target.src="https://pjsas.securetotecs.com/sites/pjsas/attachments/products/images_small/anotfound.png?1589769784203"}} /></span>
                <span className={style.productBasicContainer}>
                    <span className={style.productBasic}>Product ID: {this.props.product.productCode} </span>
                    <span className={style.productBasic}>Product Name: {this.props.product.productName}</span>
                    <span className={style.productBasic}>Price: {this.props.product.price||this.props.product.priceExTax}</span>
                </span>

                <span className={style.productCustomizeContainer}>
                    <span className={style.productCustomize}>Total Price: {`${+((this.props.product.price||this.props.product.priceExTax) * +this.props.product.quantity).toFixed(2)}`}</span>

                    <span className={style.productCustomize}>
                        {this.props.edit && <span><button onClick={(e)=>{this.props.toReduce(
                            this.props.product.barcode
                        )}}>-</button></span>}
                        <input type="text" value={this.props.product.quantity} onChange={this.handleChange} />
                        {/* <input>Quantity: {this.props.product.quantity}</input> */}
                        {this.props.edit && <span><button onClick={(e)=>{this.props.toAdd(
                            this.props.product.barcode
                        )}}>+</button></span> }
                    </span>

                </span>

                 <hr/>           

            </li>
        )
    }
}


export default Product