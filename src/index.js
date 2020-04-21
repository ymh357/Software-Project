import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './index.css';
import LoginPage from './pages/loginPage';
import HomePage from './pages/homePage';
import HistoryOrdersPage from './pages/historyOrdersPage';
import CurrentOrderPage from './pages/currentOrderPage';

class App extends React.Component {
    constructor(props) {
        super(props);
        if(!localStorage.getItem('orders')){
            let orders = [{
                id: 1,
                products: [
                    {id: 1, name: 'product A', quantity: 1},
                    {id: 2, name: 'product B', quantity: 2},
                ]
            },
                {
                    id: 2,
                    products: [
                        {id: 2, name: 'product B', quantity: 3},
                        {id: 3, name: 'product C', quantity: 4},
                    ]
                }]
            localStorage.setItem('orders', JSON.stringify(orders))
        }
        if(!localStorage.getItem('current_order')){

            localStorage.setItem('current_order', JSON.stringify({
                products:[
                    {id: 100, name: 'Milk', quantity: 2},
                    {id: 101, name: 'Burger', quantity: 3}
                ]
            }))
        }
    }

    render() {
        return (
            <Router>
                <header/>
                <div className="App" style={{height: '100%', width:'100%'}}>
                    <Route path="/" exact component={HomePage}/>
                    <Route path="/login" exact component={LoginPage}/>
                    <Route path="/viewHistoryOrder" exact component={HistoryOrdersPage}/>
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
