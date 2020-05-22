import React from "react"
import {withRouter} from 'react-router-dom'
import Product from "../components/product";
import Summary from "../components/Summary";
import axios from 'axios';

class CurrentOrderPage extends React.Component{

    constructor(props) {
        super(props);
        const order = JSON.parse(localStorage.getItem('current_order'))
        this.state = {
            order,
            edit: false,
            barcode:'',
        }
        this._handleEdit = this._handleEdit.bind(this)
        this._handleSubmit = this._handleSubmit.bind(this)
        this._handleChange = this._handleChange.bind(this)
        this._handleSave = this._handleSave.bind(this)
        this._handleScan = this._handleScan.bind(this)
        this.reduce = this.reduce.bind(this)
        this.add = this.add.bind(this)
    }

    _handleSubmit(e){
        let lines =[]
        this.state.order.products.map(item => {
            let line = {
                lineType:"PRODUCT",
                productId:item.keyProductCode,
                productCode:item.productCode,
                quantity:item.quantity,
                priceExTax:item.price,
                priceTotalExTax:item.price*item.quantity,
                productName:item.productName,
            }
            lines.push(line)
        
        })
        console.log(lines);
        axios({
                method: 'post',           
                url: 'api/purchase',
                headers: {'Content-Type': 'application/JSON; charset=UTF-8'},
                data:{
                    "sessionKey": sessionStorage.getItem("sessionKey"),
                    "lines": lines,                   
                }
            }             
            )
            .then(
                (response)=>{
                    console.log(response);
                    let {puchaseID} = response.data.data
                    let {message,status} = response.data
                    if (status=="success"){
                        //TODO find another method to store all puchaseID, now only the latest puchaseID will be stored.
                        localStorage.setItem("puchaseID",puchaseID)
                        alert(message)
                        this.props.history.push('/')
                    }
                    else{
                        console.log(message)
                        alert(message)                       
                    }
                }
            )
            .catch(
                (error)=>{
                    console.log(error)
                }
            )

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

    _handleScan(e){
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
        this.setState({
            barcode:''
        })
        this.myInput.focus()
    }

    reduce(barcode){
        let filterProducts = this.state.order.products.filter(p=>{
            return (p.barcode!=barcode)||(p.barcode==barcode && p.quantity!=1)
        })
        console.log(filterProducts)
        let newProducts = filterProducts.map(p=>{
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
                    var {status} = response.data
                    var {productname, price, keyProductCode,productCode,uri_large,uri_medium,uri_small} = response.data.data
                    let setP =(barcode, productCode,productname,price,productId,l_img,m_img,s_img) =>{                       
                        let newProduct = {productCode:productCode,productName:productname,price:price,quantity: 1, barcode: barcode,keyProductCode:productId,uri_large:l_img,uri_medium:m_img,uri_small:s_img}
                        let newProductList = this.state.order.products.concat(newProduct)
                        this.setState({
                            order: {
                                products: newProductList
                            }
                        })
                        
                    }

                    console.log(status);
                    if (status=="success"){
                        if(this.state.order.products.some(item => { return item.barcode == barcode; })){
                            this.add(barcode)
                        }
                        else{
                            setP(barcode,productCode,productname,price,keyProductCode,uri_large,uri_medium,uri_small)
                        }
                    }
                    else{
                        alert("invalid barcode")
                    }
                }
            )
            .catch(
                (error)=>{
                    console.log(error)
                }
            )
    }

    render() {
        if(sessionStorage.getItem('user')){
            if(!this.state.edit && this.state.order.products!=null){
                return (
                    <>
                        <h1>Current Order:</h1>
                        <ul>
                            {
                                this.state.order.products.map(e=>{
                                    if(e.quantity>0)
                                        return <Product product={e} key={e.barcode}/>
                                    return null
                               })
                            }
                        </ul>
                        <Summary products={this.state.order.products}/>

                      
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
                    <form onSubmit={(e) => this._handleScan(e,this.state.barcode)}>
                    <input type="text" value={this.state.barcode} id="barcode" onChange={this._handleChange} placeholder='barcode' ref={myInput=>this.myInput=myInput}/>
                    </form>
                    <button onClick={this._handleScan}>scan</button> 
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