import React from "react"
import {Link, withRouter} from 'react-router-dom'
import { Title } from "../components/Title"
class HomePage extends React.Component{

    render() {
        if(localStorage.getItem('user')){
            return (
                <div className='Cart'>
                    <Title>Home</Title>
                    <ul>
                        <li><Link to={'/order'}>View my current order</Link></li>
                        <li><Link to={'/viewHistoryOrder'}>View my history orders</Link></li>
                        <li><Link to={'/cart'}>Shopping Cart</Link></li>
                    </ul> 

                </div>

            )
        }
        //console.log(this.props.history)
        this.props.history.push('/login')
    }
}

export default withRouter(HomePage)