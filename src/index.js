import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './index.css';
import LoginPage from './pages/loginPage';
import HomePage from './pages/homePage';
import HistoryOrdersPage from './pages/historyOrdersPage';
import CurrentOrderPage from './pages/currentOrderPage';
import NavigationBar from "./components/navigation_bar";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        if(!localStorage.getItem('orders')){
            let orders = []
            localStorage.setItem('orders', JSON.stringify(orders))
        }
        if(!localStorage.getItem('current_order')){

            localStorage.setItem('current_order', JSON.stringify({
                products:[]
            }))
        }
    }

    render() {
        return (
            <Router>
                <header>
                    <NavigationBar/>
                </header>
                <div className="App" style={{height: '100%', width:'100%'}}>
                    <Route path="/" exact component={HomePage}/>
                    <Route path="/login" exact component={LoginPage}/>
                    <Route path="/viewHistoryOrder" component={HistoryOrdersPage}/>
                    <Route path="/order_detail_:orderId" component={HistoryOrdersPage}/>
                    <Route path="/order" exact component={CurrentOrderPage}/>
                </div>
                <footer/>
            </Router>
        )
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);
