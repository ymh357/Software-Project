import React from "react";
import axios from 'axios';
import {withRouter} from 'react-router-dom'
import loginStyle from '../css/login.module.css'
class LoginPage extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password:''
        }
        this._handleChange = this._handleChange.bind(this)
        this._handleSubmit = this._handleSubmit.bind(this)
    }

    _handleChange(e){
        let id = e.target.id
        this.setState({
            [id]: e.target.value
        })
    }

    _handleSubmit(e){
        e.preventDefault();
        axios({
                method: 'post',           
                url: 'api/login',
                headers: {'Content-Type': 'application/JSON; charset=UTF-8'},
                data:{
                    "username": this.state.username,
                    "password": this.state.password,
                    
                }
            }             
            )
            .then(
                (response)=>{
                    console.log(response);
                    localStorage.setItem('user', this.state.org_id);
                    localStorage.setItem('sessionKey', response);
                }
            )
            .catch(
                (error)=>{
                    console.log(error)
                }
            )
    }

    render() {

        if(localStorage.getItem('user')){
            this.props.history.push('/')
        }
        return (

            <div className={loginStyle.container}>
                <h1>Login</h1>
                <img src='https://image.flaticon.com/icons/svg/547/547432.svg' alt={'login icon'}/>
                <form onSubmit={this._handleSubmit} className={loginStyle.loginForm}>
                    <input type="text" value={this.state.username} id="username" onChange={this._handleChange} placeholder='Username'/>
                    <input type="text" value={this.state.password} id="password"  onChange={this._handleChange} placeholder='Password'/>
                    <button type="submit" className={loginStyle.loginBtn}>Login</button>
                </form>
            </div>

        )

    }
}

export default withRouter(LoginPage)