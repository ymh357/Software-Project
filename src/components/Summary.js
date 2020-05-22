import React from 'react'

class Summary extends React.Component {

    constructor(props) {
        super(props);
    }
    totalPrice() {
        let totalP = 0.0
        console.log(this.props);
        if(this.props.products!=[])
        {this.props.products.map(item =>{
            totalP += (item.price||item.priceExTax)*item.quantity
        })}
        return totalP.toFixed(2)
    }
    render() {
        return (
            <h2>
                totalprice : {this.totalPrice()}
            </h2>
        )
    }
}


export default Summary 