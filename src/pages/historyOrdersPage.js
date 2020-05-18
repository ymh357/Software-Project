import React from "react"
import {withRouter} from 'react-router-dom'
import OrderItem from '../components/orderItem'
import Order from '../components/order'
import Summary from "../components/Summary";
import style from '../css/history.module.css'


class HistoryOrdersPage extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            orders: JSON.parse(sessionStorage.getItem('orders')),
        }
    }

    render() {
       
        if(sessionStorage.getItem('user')){
           
            const orders = this.state.orders.map(order =>
               <OrderItem order={order} key={order.id}/>
            )
            if(Object.entries(this.props.match.params).length !== 0){
                let order = this.state.orders.find( e => +e.id === +this.props.match.params.orderId)
                return <ul className={style.orderContainer}><Order order={order}/><Summary products={order.products}/></ul>
            }

            return (
                <>
                    <h1>History Orders:</h1>
                    <table className={style.orderTable}>
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Order Invoiced Date</th>
                                <th>Order Price</th>
                                <th>Order Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders}
                        </tbody>

                    </table>
                </>
            )
        }

        this.props.history.push('/login')
        return 'error?'
    }
}

export default withRouter(HistoryOrdersPage)