import React from "react"
import {withRouter} from 'react-router-dom'
import OrderItem from '../components/orderItem'
import Order from '../components/order'
import PageButton from '../components/pageButton'
import Summary from "../components/Summary";
import style from '../css/history.module.css';
import NavigationBar from '../components/navigation_bar';
import axios from 'axios';

class HistoryOrdersPage extends React.Component{

    constructor(props) {
        super(props);

        //Modified by Dongsheng, clean local test data, avoid null value error
        const storedOrders = JSON.parse(localStorage.getItem('orders'))

        this.pageNext = this.pageNext.bind(this);
        this.setPage = this.setPage.bind(this);
        this.state = {
            orders:[],
            isHistoryLoading: false,
            indexList:[],// current data of this page
            current: 1, // current page
            pageSize:8, // number of orders shown on each page
            goValue:0,  // page you wanna got o
            totalPage:0,//total number of pages
        };


    }
    getNowDate() {
        var date = new Date();
        var seperator1 = "-";
        var seperator2 = ":";
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
        month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
        }
        var Hours = date.getHours();
        var Minutes = date.getMinutes();
        var Seconds = date.getSeconds();
        
        if (Hours >= 0 && Hours <= 9) {
        Hours = "0" + Hours;
        }
        if (Minutes >= 0 && Minutes <= 9) {
        Minutes = "0" + Minutes;
        }
        if (Seconds >= 0 && Seconds <= 9) {
        Seconds = "0" + Seconds;
        }
        var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
        + " " + Hours + seperator2 + Minutes
        + seperator2 + Seconds;
        return currentdate;
    }
    
    _handleRefresh(time){
    console.log("start refresh history")
    axios({
            method: 'post',           
            url: 'api/history_order',
            headers: {'Content-Type': 'application/JSON; charset=UTF-8'},
            data:{
                "session_id": sessionStorage.getItem("sessionKey"),
                "date_time": time,                   
            }
        }             
        )
        .then(
            (response)=>{
                console.log(response);
                let {message,status} = response.data
                if (status=="success"){
                    let {history_orders} = response.data.data
                    console.log(history_orders)
                    this.setState({
                        orders:history_orders,
                        isHistoryLoading:true,
                        indexList: history_orders.slice(0, this.state.pageSize),
                        totalPage: Math.ceil(history_orders.length / this.state.pageSize),
                    })
                    
                }
                else{
                    console.log(message)
                    //alert(message)                       
                }
            }
        )
        .catch(
            (error)=>{
                console.log(error)
            }
        )

    }
    componentWillMount() {
        this._handleRefresh(this.getNowDate())
        this.pageNext(this.state.goValue)

    }

    setPage(num){
        this.setState({
            indexList:this.state.orders.slice(num , num + this.state.pageSize)
        })
    }

    pageNext(num) {
        this.setPage(num)
    }

    render() {
        if(sessionStorage.getItem('user')&&this.state.isHistoryLoading){

            const orders = this.state.orders.map(order =>
               <OrderItem order={order} key={order.keyPurchaseOrderID}/>
            )

            const listorders = this.state.indexList.map(order =>
                <OrderItem order={order} key={order.keyPurchaseOrderID}/>
            )

            if(Object.entries(this.props.match.params).length !== 0){
                let order = this.state.indexList.find( e => +e.keyPurchaseOrderID === +this.props.match.params.orderId)
                return (
                    <>
                    <header>
                    <NavigationBar/>
                    </header>
                    <ul className={style.orderContainer}><Order order={order}/><Summary products={order.products}/></ul>
                </>)
            }

            return (
                <div>
                    <div>
                        <NavigationBar/>
                        <h1 className= {style.title} data-testid='historyOrders'>History Orders</h1>
                    </div>
                    <div id={style.primary} className={style.primaryContent}>
                        <div className={style.relativeWrapper}>
                            <div className={style.orderResultWrapper}>
                                <ul className={style.orderSearchResult}>
                                    {/*{orders}*/}
                                    {listorders}
                                </ul>
                                <ul>
                                    <PageButton { ...this.state } pageNext={this.pageNext}/>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        else{
            return(
                <div>

                </div>
            )
        }
        this.props.history.push('/login')
        return 'error?'
    }
}

export default withRouter(HistoryOrdersPage)
