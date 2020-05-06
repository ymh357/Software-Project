import React from "react"
import {withRouter} from 'react-router-dom'
import Product from "../components/product";
import axios from 'axios';

class CurrentOrderPage extends React.Component{

    constructor(props) {
        super(props);
        const order = JSON.parse(localStorage.getItem('current_order'))
        this.state = {
            order,
            edit: false,
            barcode:0,
        }
        this._handleEdit = this._handleEdit.bind(this)
        this._handleSubmit = this._handleSubmit.bind(this)
        this._handleChange = this._handleChange.bind(this)
        this._handleSave = this._handleSave.bind(this)
        this._handleSearch = this._handleSearch.bind(this)
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

    _handleChange(e){
        let id = e.target.id
        this.setState({
            [id]: e.target.value
        })
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
    _handleSearch(e){
        e.preventDefault();
        let scanCode = parseInt(this.state.barcode);
        console.log(scanCode);
        const res = this.state.order.products.some(item => { return item.barcode == scanCode; });
        console.log(this.state.order.products);
        console.log(res);
        if (res){
            this.add(scanCode);
        }
        else{            
            this.remoteAdd(scanCode);
        }
    }

    reduce(barcode){
        let newProducts = this.state.order.products.map(p=>{
            if(+p.barcode === barcode){
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

    add(barcode){
        console.log("add"+barcode)
        let newProducts = this.state.order.products.map(p=>{
            if(+p.barcode === barcode){
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
        // this.remoteAdd(productId);
    }
    // product price retrieve request 
    remoteAdd(barcode){
        axios({
                method: 'post',           
                url: 'api/price',
                headers: {'Content-Type': 'application/JSON; charset=UTF-8'},
                data:{
                    "sessionKey": sessionStorage.getItem("sessionKey"),
                    "barcode": barcode,                   
                }
            }             
            )
            .then(
                (response)=>{
                    console.log(response);
                    var {productname, price, productId, status} = response.data;
                    let setP =(barcode, productId,productname,price) =>{                       
                        let newProduct = {id:productId,name:productname,price:price,quantity: 1, barcode: barcode}
                        let newProductList = this.state.order.products.concat(newProduct)
                        this.setState({
                            order: {
                                products: newProductList
                            }
                        })
                        
                    }
                    console.log(status);
                    if (status===true){setP(barcode,parseInt(productId),productname,price);}
                    else{alert("invalid barcode")}
                }
            )
            .catch(
                (error)=>{
                    console.log(error)
                }
            )
    }

    render() {
        if(localStorage.getItem('user')){
            if(!this.state.edit && this.state.order.products!=null){
                return (
                    <>
                        <h1>Current Order:</h1>
                        <ul>
                            {
                                this.state.order.products.map(e=>{
                                    if(e.quantity>0)
                                        return <Product product={e} key={e.id}></Product>
                                    return null
                               })
                            }
                        </ul>

                      
                        <button onClick={this._handleSubmit}>submit</button>
                        <button onClick={this._handleEdit}>edit</button>
                    </>

                )
            }
            console.log(this.state)
            
            return (
                <>
                    <h1>Current Order editing:</h1>
                    <ul>
                        {   
                            this.state.order.products.map(e=>
                                <Product product={e} key={e.barcode} edit toReduce={this.reduce} toAdd={this.add}></Product>
                            )
                        }
                    </ul>
                    <input type="text" value={this.state.barcode} id="barcode" onChange={this._handleChange} placeholder='barcode'/>
                    <button onClick={this._handleSearch}>scan</button> 
                    <button onClick={this._handleSave}>save</button>
                </>

            )
        }
        //console.log(this.props.history)
        this.props.history.push('/login')
        return 'error?'
    }
}

export default withRouter(CurrentOrderPage)