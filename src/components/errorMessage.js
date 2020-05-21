import React, { Component } from 'react'
import styled from 'styled-components';
import {ErrorAlt} from '@styled-icons/boxicons-solid/ErrorAlt'

class ErrorMessage extends Component {
    constructor(props) {
        super(props)

        this.state = {
           
        }
    }



    render() {
        return (
            <Styleddiv>
                <StyledErrorAlt size='15' />
                <Title >The following error(s) occurred:</Title>
                <ul>
                     <Message>{this.props.massage}</Message>
                </ul>    
            </Styleddiv>
        )
    }
}

export default ErrorMessage


const Styleddiv = styled.div`
    &{
        padding-right: 47.5px;
        background: #ffebe6;
        border-color: #ffebe6;
        color: #172b4d;
        border: 0 solid #0052cc;
        border-radius: 3px;
        color: #172b4d;
        margin: 20px 0 0;
        overflow-wrap: break-word;
        padding: 5px 15px 5px 40px;
        position: relative;
        word-wrap: break-word;
        word-break: normal;
    }

`;

const Title = styled.p`
    font-weight: 700;
`;

const Message = styled.li`
    display: list-item;
    text-align: -webkit-match-parent;
`;
const StyledErrorAlt = styled(ErrorAlt)`
    color: red; 
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0;
    font-family: Adgs Icons;
    font-weight: 400;
    font-style: normal;
    speak: none;
    font-size: 16px;
    left: 15px;
    line-height: 20px;
    position: absolute;
    top: 15px; 
`
   