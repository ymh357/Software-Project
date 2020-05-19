import React from 'react';
import { Container, Navbar, Nav} from 'react-bootstrap'
import Cart from '../Cart';


import './TopMenu.scss'

export default function TopMenu(props){

    const {productsCart, getProductCart, products} = props;

    return(
        <Navbar bg="dark" variant="dark" className="top-menu">
            <Container>
                <Cart 
                    productsCart={productsCart}
                    getProductCart={getProductCart}
                    products={products}
                />
            </Container>
        </Navbar>
    );
}