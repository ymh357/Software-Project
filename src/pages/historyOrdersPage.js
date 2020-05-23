import React from "react"
import {withRouter} from 'react-router-dom'
import OrderItem from '../components/orderItem'
import Order from '../components/order'
import Summary from "../components/Summary";
import style from '../css/history.module.css';
import NavigationBar from '../components/navigation_bar';
import axios from 'axios';


class HistoryOrdersPage extends React.Component{

    constructor(props) {
        super(props);

        //Modified by Dongsheng, clean local test data, avoid null value error
        const storedOrders = JSON.parse(localStorage.getItem('orders'))
        this.state = {
            orders: [],
            isHistoryLoading: false,
        }

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
    componentWillMount(){
        this._handleRefresh(this.getNowDate()) 
        let testdata =  [
            {
                "bill_status": "SERVER_SUCCESS",
                "createdDate": "Thu, 21 May 2020 10:25:25 GMT",
                "keyPurchaseOrderID": "1590056725230756",
                "products": [
                    {
                        "lineType": "PRODUCT",
                        "priceExTax": 1.4,
                        "priceTotalExTax": 1.4,
                        "productCode": "01194",
                        "productId": "21479231981342",
                        "productName": "Tarpaulin 120cm x 180cm (4' x 6')",
                        "quantity": 1,
                        "uri_large": "https://attachments.pjsas.com.au/products/images_large/49852.jpg",
                        "uri_medium": "https://attachments.pjsas.com.au/products/images_medium/49852.jpg",
                        "uri_small": "https://attachments.pjsas.com.au/products/images_small/49852.jpg"
                    }
                ]
            },
            {
                "bill_status": "SERVER_SUCCESS",
                "createdDate": "Thu, 21 May 2020 07:54:46 GMT",
                "keyPurchaseOrderID": "1590047685324486",
                "products": [
                    {
                        "lineType": "PRODUCT",
                        "priceExTax": 1.4,
                        "priceTotalExTax": 2.8,
                        "productCode": "01194",
                        "productId": "21479231981342",
                        "productName": "Tarpaulin 120cm x 180cm (4' x 6')",
                        "quantity": 2,
                        "uri_large": "https://attachments.pjsas.com.au/products/images_large/49852.jpg",
                        "uri_medium": "https://attachments.pjsas.com.au/products/images_medium/49852.jpg",
                        "uri_small": "https://attachments.pjsas.com.au/products/images_small/49852.jpg"
                    },
                    {
                        "lineType": "PRODUCT",
                        "priceExTax": 4.34,
                        "priceTotalExTax": 4.34,
                        "productCode": "01408",
                        "productId": "21479231982804",
                        "productName": "Adhesive Spray Craft 350g",
                        "quantity": 1,
                        "uri_large": "https://attachments.pjsas.com.au/products/images_large/49888.jpg",
                        "uri_medium": "https://attachments.pjsas.com.au/products/images_medium/49888.jpg",
                        "uri_small": "https://attachments.pjsas.com.au/products/images_small/49888.jpg"
                    }
                ]
            },] 
        // this.setState({
        //     orders: testdata,
        // })

    }
    render() {
       
        if(sessionStorage.getItem('user')&&this.state.isHistoryLoading){
           
            const orders = this.state.orders.map(order =>
               <OrderItem order={order} key={order.keyPurchaseOrderID}/>
            )
            if(Object.entries(this.props.match.params).length !== 0){
                let order = this.state.orders.find( e => +e.keyPurchaseOrderID === +this.props.match.params.orderId)
                return (
                    <>
                    <header>
                    <NavigationBar/>
                    </header>
                    <ul className={style.orderContainer}><Order order={order}/><Summary products={order.products}/></ul>
                </>)
            }

            return (
                <>
                    <NavigationBar/>
                    <h1 data-testid='historyOrders'>History Orders:</h1>
                    <table className={style.orderTable}>
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Order Invoiced Date</th>
                                <th>Order status</th>
                                <th>Order Price</th>
                                <th>Order Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders}
                        </tbody>

                    </table>
                </>
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