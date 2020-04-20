import React from "react"
import {Link, withRouter} from 'react-router-dom'
import { Title } from "../components/Title"
class HomePage extends React.Component{

    render() {
        if(localStorage.getItem('user')){
            return (
                <div className='Cart'>
                    <Title>Home</Title>
                    
                    
                        <div className="tile is-4 is-vertical is-parent">
                            <div className="tile is-child box">
                            <p className="card-title"><Link to={'/order'}>Scan Products</Link></p>
                            </div>
                        </div>
                        <div className="tile is-4 is-vertical is-parent">

                            <div className="tile is-child box">
                            <p className="card-title"><Link to={'/viewHistoryOrder'}>Add Manually</Link></p>
                            </div>
                        </div>
                        <div className="tile is-4 is-vertical is-parent">
                            <div className="tile is-child box">
                            <p className="card-title"><Link to={'/cart'}>Shopping Cart</Link></p>
                            </div>
                        </div>
                        <div className="tile is-4 is-vertical is-parent">
                            <div className="tile is-child box">
                            <p className="card-title">Log out</p>
                           {// <p className="card-title"><Link to={'/login'}>Log out</Link></p>
                           }
                            </div>
                        </div>
                     

                </div>

            )
        }
        //console.log(this.props.history)
        this.props.history.push('/login')
    }
}

export default withRouter(HomePage)