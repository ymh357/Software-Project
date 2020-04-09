import React from "react"
import {Link, withRouter} from 'react-router-dom'
class HomePage extends React.Component{

    render() {
        if(localStorage.getItem('user')){
            return (
                <>
                    <h1>Home</h1>
                    <ul>
                        <li><Link to={'/order'}>View my current order</Link></li>
                        <li><Link to={'/viewHistoryOrder'}>View my history orders</Link></li>
                    </ul>

                </>

            )
        }
        //console.log(this.props.history)
        this.props.history.push('/login')
    }
}

export default withRouter(HomePage)