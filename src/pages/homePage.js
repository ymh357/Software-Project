import React from "react"
import {Link, withRouter} from 'react-router-dom'
import { Title } from "../components/Title"
import homeStyle from '../css/home.module.css'
import Logout from '../components/Logout'
import NavigationBar from '../components/navigation_bar'


class HomePage extends React.Component{

    render() {
        console.log(homeStyle)
        if(sessionStorage.getItem('user')){
            //TODO: use another way to load the img to avoid repeated downloads
            return (
                <>
                    <header>
                        <NavigationBar/>
                    </header>
                    <h1 data-testid= "homePage">Home</h1>
                    <div className={homeStyle.menu}>
                        <div className={homeStyle.item}>
                            <div className={homeStyle.imgBlock}>
                            <img className={homeStyle.postImg}  src='https://image.flaticon.com/icons/svg/711/711897.svg' alt={'Current Order'}/>
                            </div>
                            <div className={homeStyle.urlBlock}> 
                            <Link to={'/order'}>Current Order</Link>
                            </div>
                        </div>
                        <div className={homeStyle.item}>
                            <div className={homeStyle.imgBlock}>
                            <img className={homeStyle.postImg}  src='https://image.flaticon.com/icons/svg/2521/2521625.svg' alt={'history order'}/>
                            </div>
                            <div className={homeStyle.urlBlock}> 
                            <Link to={'/viewHistoryOrder'}>History Order</Link>
                            </div>
                        </div>
                    </div>
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