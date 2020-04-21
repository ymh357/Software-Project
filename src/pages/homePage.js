import React from "react"
import {Link, withRouter} from 'react-router-dom'
import homeStyle from '../css/home.module.css'


class HomePage extends React.Component{

    render() {
        console.log(homeStyle)
        if(localStorage.getItem('user')){
            return (
                <>
                    <h1>Home</h1>
                    <ul className={homeStyle.menu}>
                        <li>
                            <img src='https://image.flaticon.com/icons/svg/651/651998.svg' alt={'scan img'}/>
                            <Link to={'/'}>SCAN</Link>
                        </li>
                        <li>
                            <img src='https://as2.ftcdn.net/jpg/02/02/10/47/500_F_202104739_twqUgB0XofzZyEd17gHi81nJvOhhpZ9Z.jpg' alt={'manually img'}/>
                            <Link to={'/order'}>MANUALLY</Link>
                        </li>
                        <li>
                            <img src='https://image.flaticon.com/icons/svg/711/711897.svg' alt={'cart img'}/>
                            <Link to={'/'}>CART</Link>
                        </li>
                        <li>
                            <img src='https://image.flaticon.com/icons/svg/2521/2521625.svg' alt={'history img'}/>
                            <Link to={'/viewHistoryOrder'}>HISTORY</Link>
                        </li>
                    </ul>

                </>

            )
        }
        //console.log(this.props.history)
        this.props.history.push('/login')
        console.log(this.props.history)
        return 'error?'
    }
}

export default withRouter(HomePage)