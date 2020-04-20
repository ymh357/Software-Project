import React from "react"
import {withRouter} from 'react-router-dom'
import Order from '../components/order'

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
                <div className='ProductsList-items'>
                    {orders}
                </div>

            )
        }
        //console.log(this.props.history)
        this.props.history.push('/login')
    }
}

export default withRouter(HistoryOrdersPage)