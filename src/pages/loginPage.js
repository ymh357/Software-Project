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
    background: linear-gradient(to right top, #8e44ad 0%, #3498db 100%);

    height: 100%
`



const Logo = styled.img`
    max-width: 30%;
    max-height: 30%;
`