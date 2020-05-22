import React from 'react'
import {withRouter} from 'react-router-dom'

class OrderItem extends React.Component{

    render(){
        const price = this.props.order.products.reduce((acc, cur) => {
            return acc + cur.price * cur.quantity
        },0)
        return (
            <tr>
                <td>{this.props.order.id}</td>
                <td>{this.props.order.date}</td>
                <td>{price}</td>
                <td><a href={`/order_detail_${this.props.order.id}`}>Have a look</a></td>
            </tr>
        )
    }
}

export default OrderItem
