import React from 'react'
import {withRouter} from 'react-router-dom'

class OrderItem extends React.Component{

    constructor(props) {
        super(props);
        this._handleClick = this._handleClick.bind(this)
    }

    _handleClick(){
        this.props.history.push(`/order_detail_${this.props.order.keyPurchaseOrderID}`)
    }


    render(){
        const price = this.props.order.products.reduce((acc, cur) => {
            return acc + cur.priceTotalExTax
        },0)
        
        const date = ()=>{
            let itemdate = new Date(this.props.order.createdDate)
            //console.log(itemdate)
            var seperator1 = "-";
            var seperator2 = ":";
            var month = itemdate.getUTCMonth() + 1;
            var strDate = itemdate.getUTCDate();
            if (month >= 1 && month <= 9) {
            month = "0" + month;
            }
            if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
            }
            var Hours = itemdate.getUTCHours();
            var Minutes = itemdate.getUTCMinutes();
            var Seconds = itemdate.getUTCSeconds();
            if (Hours >= 0 && Hours <= 9) {
                Hours = "0" + Hours;
            }
            if (Minutes >= 0 && Minutes <= 9) {
            Minutes = "0" + Minutes;
            }
            if (Seconds >= 0 && Seconds <= 9) {
            Seconds = "0" + Seconds;
            }
            var currentdate = itemdate.getUTCFullYear() + seperator1 + month + seperator1 + strDate
            + " " + Hours + seperator2 + Minutes
            + seperator2 + Seconds;
            return currentdate;
        }



        return (
            <tr onClick={this._handleClick}>
                <td>{this.props.order.keyPurchaseOrderID}</td>
                <td>{this.props.order.bill_status.slice(7)}</td>
                <td>{date()}</td>
                <td>{price.toFixed(2)}</td>
            </tr>
        )
    }
}

export default withRouter(OrderItem)