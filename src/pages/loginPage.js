import React from "react";
import {withRouter} from 'react-router-dom';
import axios from 'axios';

class LoginPage extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            org_id: '',
            org_key: '',
            org_pw: ''
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
                    "org_id": this.state.id,
                    "api_org_key": this.state.org_key,
                    "api_org_pw": this.state.org_pw
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
            <form onSubmit={this._handleSubmit}>
                <label htmlFor="org_id">Organization ID:</label>
                <input type="text" value={this.state.org_id} id="org_id" onChange={this._handleChange}/>
                <label htmlFor="org_key">Organization Key:</label>
                <input type="text" value={this.state.org_key} id="org_key"  onChange={this._handleChange}/>
                <label htmlFor="org_pw">Organization Password:</label>
                <input type="password" value={this.state.org_pw} id="org_pw"  onChange={this._handleChange}/>
                <button type="submit">Sign in</button>
            </form>
        )

    }
}

export default withRouter(LoginPage)