import React from 'react'
import {withRouter} from 'react-router-dom'

class OrderItem extends React.Component{

    render(){
        const price = this.props.order.products.reduce((acc, cur) => {
            return acc + cur.priceTotalExTax
        },0)
        return (
            <tr>
                <td>{this.props.order.keyPurchaseOrderID}</td>
                <td>{this.props.order.createdDate}</td>
                <td>{this.props.order.bill_status}</td>
                <td>{price.toFixed(2)}</td>
                <td><a href={`/order_detail_${this.props.order.keyPurchaseOrderID}`}>Have a look</a></td>
            </tr>
        )
    }
}

export default OrderItem