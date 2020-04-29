import React from 'react';
import style from '../css/navigation_bar.css'
import {withRouter} from 'react-router-dom'

class NavigationBar extends React.PureComponent{
//18010130155
    constructor(props) {
        super(props)
    }

    toggle() {  ///
        let x = document.getElementById("myTopnav")
        if (x.className === style.topnav) {
            x.className += ' ' + style.responsive
        } else {
            x.className = style.topnav
        }
    }

    render() {
        return(
            <>
                <div className={style.topnav} id="myTopnav">
                    <a href="/" className={this.props.location.pathname === '/'? style.active : ''}>Home</a>
                    <a href="/viewHistoryOrder" className={this.props.location.pathname === '/viewHistoryOrder'? style.active : ''}>History</a>
                    <a href="/order" className={this.props.location.pathname === '/order'? style.active : ''}>Order</a>
                    <a href="/cart" className={this.props.location.pathname === '/cart'? style.active : ''}>Cart</a>
                    <a href="#" className={style.icon} onClick={this.toggle}>
                        pop
                    </a>
                </div>
            </>


        )
    }
}

export default withRouter(NavigationBar)