import React from "react"
import {withRouter} from 'react-router-dom'
import Product from "../components/product";
import style from '../css/current_order.css'

class CurrentOrderPage extends React.Component{

    constructor(props) {
        super(props);
        const order = JSON.parse(localStorage.getItem('current_order'))
        this.state = {
            order,
            edit: false,
        }
        this._handleEdit = this._handleEdit.bind(this)
        this._handleSubmit = this._handleSubmit.bind(this)
        this._handleSave = this._handleSave.bind(this)
        this.reduce = this.reduce.bind(this)
        this.add = this.add.bind(this)
    }

    _handleSubmit(e){
        let orders = JSON.parse(localStorage.getItem('orders'))
        let id = orders[orders.length-1].id
        orders.push({id:id+1,...this.state.order})
        localStorage.setItem('orders', JSON.stringify(orders))

        this.props.history.push('/')
    }

    _handleEdit(e){
        this.setState({
            edit: true
        })
    }

    _handleSave(e){
        this.setState({
            edit: false
        })
    }

    reduce(productId){
        let newProducts = this.state.order.products.map(p=>{
            if(+p.id === productId){
                let newP = {...p}
                if(newP.quantity > 0){
                    newP.quantity --
                }
                return newP
            }
            return p
        })

        this.setState({
            order: {
                products: newProducts
            }
        })
    }

    add(productId){
        let newProducts = this.state.order.products.map(p=>{
            if(+p.id === productId){
                let newP = {...p}
                newP.quantity ++
                return newP
            }
            return p
        })
        this.setState({
            order: {
                products: newProducts
            }
        })
    }

    render() {
        if(localStorage.getItem('user')){
            if(!this.state.edit){
                return (
                    <div className={style.currentOrder}>
                        <h1>Current Order:</h1>
                        <ul className={style.cardContainer}>
                            {
                                this.state.order.products.map(e=>{
                                    if(e.quantity>0)
                                        return <Product product={e} key={e.id}></Product>
                                    return null
                               })
                            }
                        </ul>
                        <div>Total Price: {this.state.order.products.reduce((acc , cur)=>{
                            return acc + (cur.price * cur.quantity)
                         }, 0)}</div>
                        <button onClick={this._handleSubmit}>submit</button>
                        <button onClick={this._handleEdit}>edit</button>
                    </div>

                )
            }
            return (
                <div className={style.currentOrder}>
                    <h1>Current Order editing:</h1>
                    <ul className={style.cardContainer}>
                        {
                            this.state.order.products.map(e=>
                                <Product product={e} key={e.id} edit toReduce={this.reduce} toAdd={this.add}></Product>
                            )
                        }
                    </ul>
                    <button onClick={this._handleSave}>save</button>
                </div>

            )
        }
        //console.log(this.props.history)
        this.props.history.push('/login')
        return 'error?'
    }
}

export default withRouter(CurrentOrderPage)