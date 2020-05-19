import React from 'react'
import {ListGroup, Card, Button} from 'react-bootstrap'
//import {BASE_PATH} from '../../utils/constants'

import './Product.scss'

export default function Product(props){
    
    const {product, addProductCart} = props;


    return (
        <ListGroup className='product' variant="flush" style={{ width: '100%' }}>
            <ListGroup.Item>
                {/* <Card.Img variant='top' src={`${base_path}/${product.image}`}/> */}
                <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    {/* <Card.Text>{product.extraInfo}</Card.Text> */}
                    {/* <Card.Text>{product.price} AU$ / Unit </Card.Text> */}
                    <Card.Text>Product Code {product.productCode} </Card.Text>
                    <Button onClick={()=>addProductCart(product.keyProductID, product.name)}>
                        Add to cart
                    </Button>
                </Card.Body>
            </ListGroup.Item>
        </ListGroup>
    )
}