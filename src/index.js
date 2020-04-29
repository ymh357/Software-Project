import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './index.css';
import LoginPage from './pages/loginPage';
import HomePage from './pages/homePage';
import HistoryOrdersPage from './pages/historyOrdersPage';
import CurrentOrderPage from './pages/currentOrderPage';
import Cart from './pages/Cart';
import NavigationBar from "./components/navigation_bar";

class App extends React.Component {
    constructor(props) {
        super(props);
        if(!localStorage.getItem('orders')){
            let orders = [{
                id: 1,
                products: [
                    {id: 1, name: 'product A', quantity: 1, price: 10},
                    {id: 2, name: 'product B', quantity: 2, price: 20},
                ]
            },
                {
                    id: 2,
                    products: [
                        {id: 2, name: 'product B', quantity: 3, price: 30},
                        {id: 3, name: 'product C', quantity: 4, price: 40},
                        {id: 4, name: 'product D', quantity: 1, price: 10},
                    ]
                }, {
                    id: 3,
                    products: [
                        {id: 5, name: 'product E', quantity: 3, price: 30},
                        {id: 6, name: 'product F', quantity: 4, price: 40},
                        {id: 7, name: 'product G', quantity: 1, price: 10},
                        {id: 8, name: 'product H', quantity: 1, price: 10},
                    ]
                }]
            localStorage.setItem('orders', JSON.stringify(orders))
        }
        if(!localStorage.getItem('current_order')){

            localStorage.setItem('current_order', JSON.stringify({
                products:[
                    {id: 100, name: 'Milk', quantity: 2, price: 50},
                    {id: 101, name: 'Burger', quantity: 3, price: 60},
                    {id: 102, name: 'The shy', quantity: 1, price: 10},
                    {id: 103, name: 'Energy Drink', quantity: 1, price: 10}
                ]
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
                    <Route path="/viewHistoryOrder" exact component={HistoryOrdersPage}/>
                    <Route path="/order" exact component={CurrentOrderPage}/>
                    <Route path="/cart" component={Cart}></Route>
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
