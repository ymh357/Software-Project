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
                    let {session_id} = response.data.data;
                    console.log(message);
                    alert(message);
                    if(status=="success"){
                        sessionStorage.setItem('user', this.state.username);
                        sessionStorage.setItem('sessionKey', session_id);
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
            <>
                {error && <ErrorMessage massage={errorMassage}/>} 
               
                <StyledForm onSubmit={this._handleSubmit} className={this.props.className}>

                    
                    <Header>Welcome to SQUIZZ</Header>
                    <Fields>
                        <StyledInput>
                            <Icon  src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/user_icon_copy.png" />
                            <Inputbox type="text" value={this.state.username} id="username" onChange={this._handleChange} placeholder='Username' required={true}/>
                        </StyledInput>
                        

                        <StyledInput>
                            <Icon src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/lock_icon_copy.png" />
                            <Inputbox  type="password" value={this.state.password} id="password"  onChange={this._handleChange} placeholder='Password' required={true}/>

                        </StyledInput>
                        <SubmitField>
                        <StyledButton type="submit">Login</StyledButton>
                        </SubmitField>
                        
                        
                    </Fields>
                   
                </StyledForm>
            </>

        )

    }
}

export default LoginForm

const Header = styled.div`
color: #afb1be;
height: 60px;
text-align: left;
font-size: 16px;
`
const Fields = styled.div`
height: 208px;
    position: absolute;
    left: 0;
    width:100%
`
const StyledInput = styled.div`
position: relative;
display: block;
width:100%
`

const Inputbox = styled.input`
color: #afb1be;
    width: 100%;
    margin-top: -2px;
    background: #32364a;
    left: 0;
    padding: 10px 65px;
    border-top: 2px solid #393d52;
    border-bottom: 2px solid #393d52;
    border-right: none;
    border-left: none;
    outline: none;
    font-family: 'Gudea', sans-serif;
    box-shadow: none;

`


const StyledForm = styled.form`

opacity: 1;
top: 20px;
-webkit-transition-timing-function: cubic-bezier(0.68, -0.25, 0.265, 0.85);
-webkit-transition-property: opacity,box-shadow,top,left,-webkit-transform;
transition-property: opacity,box-shadow,top,left,-webkit-transform;
transition-property: transform,opacity,box-shadow,top,left;
transition-property: transform,opacity,box-shadow,top,left,-webkit-transform;
-webkit-transition-duration: .5s;
        transition-duration: .5s;
-webkit-transform-origin: 161px 100%;
        transform-origin: 161px 100%;
-webkit-transform: rotateX(0deg);
        transform: rotateX(0deg);
position: relative;
width: 25%;
border-top: 2px solid #D8312A;
height: 50%;
position: absolute;
left: 0;
right: 0;
margin: auto;
top: 0;
bottom: 0;
padding: 100px 40px 40px 40px;
background: #35394a;
/* Old browsers */
/* FF3.6+ */
/* Chrome,Safari4+ */
/* Chrome10+,Safari5.1+ */
/* Opera 11.10+ */
/* IE10+ */
background: linear-gradient(45deg, #35394a 0%, #1f222e 100%);
/* W3C */
filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#35394a', endColorstr='#1f222e',GradientType=1 );
/* IE6-9 fallback on horizontal gradient */
`

const SubmitField = styled.div`
position: relative;
top: 35px;
left: 0;
width: 80%;
right: 0;
margin: auto;
`

const StyledButton = styled.button`
border-radius: 50px;
    background: transparent;
    padding: 10px 50px;
    border: 2px solid #DC6180;
    color: #DC6180;
    text-transform: uppercase;
    font-size: 11px;
    -webkit-transition-property: background,color;
    transition-property: background,color;
    -webkit-transition-duration: .2s;
    transition-duration: .2s;
    &:hover {
        color: white;
        background: #DC6180;
        cursor: pointer;
        -webkit-transition-property: background,color;
        transition-property: background,color;
        -webkit-transition-duration: .2s;
                transition-duration: .2s;
    }

    &:focus{
        box-shadow: none;
        outline: none;
    }
`

const Icon = styled.img`
position: absolute;
    z-index: 1;
    left: 36px;
    top: 8px;
    opacity: .5;
`