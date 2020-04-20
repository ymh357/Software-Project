import React from "react";
import {withRouter} from 'react-router-dom'

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
        localStorage.setItem('user', this.state.org_id)
    }

    render() {

        if(localStorage.getItem('user')){
            this.props.history.push('/')
        }
        return (

            <form onSubmit={this._handleSubmit}>

              {/*  <div className="field">
                <p className="control has-icons-left has-icons-right">
                    <input className="input" type="email" placeholder="Email"/>
                    <span className="icon is-small is-left">
                    <i className="fas fa-envelope"></i>
                    </span>
                    <span className="icon is-small is-right">
                    <i className="fas fa-check"></i>
                    </span>
                </p>
                </div>
                <div className="field">
                <p className="control has-icons-left">
                    <input className="input" type="password" placeholder="Password"/>
                    <span className="icon is-small is-left">
                    <i className="fas fa-lock"></i>
                    </span>
                </p>
                </div>
                <div className="field">
                <p className="control">
                    <button className="button is-success">
                    Login
                    </button>
                </p>
                </div>

                */}
                 
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