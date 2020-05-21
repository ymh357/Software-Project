import React from "react";
import axios from 'axios';
import ErrorMessage from './errorMessage'
import styled from 'styled-components';
import {withRouter, Redirect} from 'react-router-dom'
class LoginForm extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password:'',
            error: false,
            errorMassage:'',
            isLogout:true
        }
        this._handleChange =  this._handleChange.bind(this)
        this._handleSubmit =  this._handleSubmit.bind(this)
    }


    _handleChange(e){
        let id = e.target.id
        this.setState({
            [id]: e.target.value
        })
      
    }

    _handleSubmit(e){
        e.preventDefault();//test need
        
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
                    let {status, message} = response.data;
                    console.log(status);
                    if(status=="success"){
                        sessionStorage.setItem('user', this.state.username);
                        sessionStorage.setItem('sessionKey',message);
                        this.setState({
                            error:false,
                            isLogout:false
                        })
                       
                    
                    }
                    else{
                        this.setState({
                            error:true,
                            errorMassage:"Sorry, your username and/or password are incorrect. Please try again."
                        })
                    } 
                }
            )
            .catch(
                (e)=>{
                    console.log(e)
                    this.setState({
                        error:true,
                        errorMassage: e.response.data
                    })

                }
            )
      
    }

    render() {
      if (!this.state.isLogout){
            this.state.isLogout = true
            return <Redirect to = {{ pathname: "/" }} />
        }  
        const {error, errorMassage} = this.state
        return (
                <StyledForm onSubmit={this._handleSubmit} className={this.props.className}>
                    {error && <ErrorMessage massage={errorMassage}/>} 
                    <StyledInput type="text" value={this.state.username} id="username" onChange={this._handleChange} placeholder='Username' required={true}/>
                    <StyledInput type="password" value={this.state.password} id="password"  onChange={this._handleChange} placeholder='Password' required={true}/>
                    <StyledButton type="submit">Login</StyledButton>
                </StyledForm>

        )

    }
}

export default LoginForm


const StyledInput = styled.input`
    width: 100%;
    box-sizing: border-box;
    padding: 6px 8px;
    display: inline-block;
    text-align: left;
    text-decoration: none;
    font-size: 18px;
    border-radius: 3px;
    border: 1px solid rgba(74,74,74,0.25);
    margin-top: 27px;
`
const StyledForm = styled.form`

    background: #e6e6e6;
    border-radius: 8px;
    box-shadow: 0 0 40px -10px #000;
    margin: 40px auto;
    padding: 20px 30px;
    max-width: calc(100vw - 40px);
    box-sizing: border-box;
    font-family: 'Montserrat',sans-serif;
    position: relative;
`
const StyledButton = styled.button`
    background-color: #4A90E2;
    border: solid 1px #4A90E2;
    border-radius: 3px;
    color: #fff;
    cursor: pointer;
    text-align: center;
    width: 100%;
    box-sizing: border-box;
    padding: 6px 8px;
    display: inline-block;
    text-decoration: none;
    font-size: 18px;
    margin-top: 27px;
`