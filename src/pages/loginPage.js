import React from "react";
import axios from 'axios';
import {withRouter} from 'react-router-dom'
import LoginForm from '../components/loginForm'
import styled from 'styled-components';

class LoginPage extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
        }
   
    }

    render() {
        return (

            <Page>
                    <div>
                        <Header>Welcome to SQUIZZ</Header>
                        <Logo src='https://image.flaticon.com/icons/svg/547/547432.svg' alt={'login icon'}/>
                        <LoginForm />
                    </div>
                    
            </Page>

        )

    }
}

export default withRouter(LoginPage)

const Page = styled.div`
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 90vh;
    -webkit-justify-content: center;
    background: #59ABE3;
    height: 100%
`

const Header = styled.h1`
    font-size: 24px;
    line-height: normal;
    display: block;
    font-size: 2em;
    margin-block-start: 0em;
    margin-block-end: 0.67em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
    color: #fff;
`

const Logo = styled.img`
    max-width: 40%;
    max-height: 50%;
`