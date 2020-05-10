import React from "react"
import {withRouter} from 'react-router-dom'
import Order from '../components/order'
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
                <Order order={order} key={order.id}></Order>
            )
            
            return (
                <>
                    <h1>History Orders</h1>
                    <ul className={style.orderContainer}>

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