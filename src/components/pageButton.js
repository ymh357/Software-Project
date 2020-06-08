import React from "react";
import styled from 'styled-components';
import {withRouter} from 'react-router-dom'
import style from "../css/orderItem.module.css";

class PageButton extends React.Component {

    constructor(props) {
        super(props);
        this.setNext=this.setNext.bind(this);
        this.setUp=this.setUp.bind(this);
        this.state={
            num: 0,
            pagenum:this.props.current
        }
    }

    setNext(){
        if(this.state.pagenum < this.props.totalPage){
            this.setState({
                num:this.state.num + this.props.pageSize,
                pagenum:this.state.pagenum + 1
            },function () {
                console.log(this.state)
                this.props.pageNext(this.state.num)
            })
        }
    }

    setUp(){
        if(this.state.pagenum > 1){
            this.setState({
                num:this.state.num - this.props.pageSize,
                pagenum:this.state.pagenum - 1
            },function () {
                console.log(this.state)
                this.props.pageNext(this.state.num)
            })
        }
    }

    render() {
        return (
            <ChangePage>
                <button className={style.pageButton} onClick={ this.setUp } > PREVIOUS</button>
                <span>   Page: { this.state.pagenum } of { this.props.totalPage }   </span>
                <button className={style.pageButton} onClick={ this.setNext }> NEXT</button>
            </ChangePage>
        );
    }
}

export default withRouter(PageButton)

const ChangePage = styled.div`
    position: relative;
    margin: auto;
    width: 70%;
`
