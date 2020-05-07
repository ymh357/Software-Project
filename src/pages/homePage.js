import React from "react"
import {Link, withRouter} from 'react-router-dom'
import { Title } from "../components/Title"
import homeStyle from '../css/home.module.css'
import Logout from '../components/Logout'


class HomePage extends React.Component{

    render() {
        console.log(homeStyle)
        if(localStorage.getItem('user')){
            return (
                <>
                    <h1>Home</h1>
                    <div className={homeStyle.menu}>
                        <div className={homeStyle.item}>
                            <div className={homeStyle.imgBlock}>
                            <img className={homeStyle.postImg} src='https://image.flaticon.com/icons/svg/651/651998.svg' alt={'scan img'}/>
                            </div>
                            <div className={homeStyle.urlBlock}> 
                            <Link to={'/'}>SCAN</Link>
                            </div>
                        </div>
                        <div className={homeStyle.item}>
                            <div className={homeStyle.imgBlock}>
                            <img className={homeStyle.postImg}  src='https://as2.ftcdn.net/jpg/02/02/10/47/500_F_202104739_twqUgB0XofzZyEd17gHi81nJvOhhpZ9Z.jpg' alt={'manually img'}/>
                            </div>
                            <div className={homeStyle.urlBlock}> 
                            <Link to={'/order'}>MANUALLY</Link>
                            </div>
                        </div>
                        <div className={homeStyle.item}>
                            <div className={homeStyle.imgBlock}>
                            <img className={homeStyle.postImg}  src='https://image.flaticon.com/icons/svg/711/711897.svg' alt={'cart img'}/>
                            </div>
                            <div className={homeStyle.urlBlock}> 
                            <Link to={'/'}>CART</Link>
                            </div>
                        </div>
                        <div className={homeStyle.item}>
                            <div className={homeStyle.imgBlock}>
                            <img className={homeStyle.postImg}  src='https://image.flaticon.com/icons/svg/2521/2521625.svg' alt={'history img'}/>
                            </div>
                            <div className={homeStyle.urlBlock}> 
                            <Link to={'/viewHistoryOrder'}>HISTORY</Link>
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