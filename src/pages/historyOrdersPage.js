import React from "react"
import {withRouter} from 'react-router-dom'
import Order from '../components/order'
import historyStyle from '../css/history.module.css'

class HistoryOrdersPage extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            orders: JSON.parse(localStorage.getItem('orders')),
        }
    }

    render() {
       
        if(localStorage.getItem('user')){
           
            const orders = this.state.orders.map(order =>
                <Order order={order} key={order.id}></Order>
            )
            
            return (
                <>
                    <h1>History Orders</h1>
                    <ul>

                        {orders}
                    </ul>
                </>

            )
        }

        this.props.history.push('/login')
        return 'error?'
    }
}

export default withRouter(HistoryOrdersPage)