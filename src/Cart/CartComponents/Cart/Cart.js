import React, {useState, useEffect} from 'react';
import { Button } from 'react-bootstrap';
import {ReactComponent as CartEmpty} from '../../assets/svg/cart-empty.svg';
import {ReactComponent as CartFull} from '../../assets/svg/cart-full.svg';
import {ReactComponent as Close} from "../../assets/svg/close.svg"
import {ReactComponent as Garbage} from "../../assets/svg/garbage.svg"
import {STORAGE_PRODUCTS_CART, BASE_PATH} from "../../utils/constants"

import {
removeArrayDuplicates,
countDuplicatesItemArray,
removeItemArray
} from "../../utils/arrayFunc";

import './Cart.scss'

export default function Cart (props){

    const {productsCart, getProductCart, products} = props;

    const [cartOpen, setCartOpen]=useState(false);
    const widthCartContent = cartOpen ? 400 : 0;
    const [singleProductsCart, setSingleProductsCart] = useState([]);
    const [cartTotalPrice, setCartTotalPrice] = useState(0);

    useEffect(() => {
        const allProductsId = removeArrayDuplicates(productsCart);
        setSingleProductsCart(allProductsId);
      }, [productsCart]);

    useEffect(() => {
        const productData = [];
        let totalPrice = 0;
    
        const allProductsId = removeArrayDuplicates(productsCart);
        allProductsId.forEach(productId => {
          const quantity = countDuplicatesItemArray(productId, productsCart);
          const productValue = {
            id: productId,
            quantity: quantity
          };
          productData.push(productValue);
        });
    
        if (!products.loading && products.result) {
          products.result.forEach(product => {
            productData.forEach(item => {
              if (product.keyProductID === item.keyProductID) {
                const totalValue = product.price * item.quantity;
                totalPrice = totalPrice + totalValue;
              }
            });
          });
        }
    
        setCartTotalPrice(totalPrice);
      }, [productsCart, products]);

    const openCart = () => {
        setCartOpen(true);
        document.body.style.overflow = "hidden";

    };

    const closeCart = () => {
        setCartOpen(false);
        document.body.style.overflow = "scroll";

    };

    const emptyCart = () => {
        localStorage.removeItem(STORAGE_PRODUCTS_CART);
        getProductCart();
      };
    
      const increaseQuantity = id => {
        const arrayItemsCart = productsCart;
        arrayItemsCart.push(id);
        localStorage.setItem(STORAGE_PRODUCTS_CART, arrayItemsCart);
        getProductCart();
      };
    
      const decreaseQuantity = id => {
        const arrayItemsCart = productsCart;
        const result = removeItemArray(arrayItemsCart, id.toString());
        localStorage.setItem(STORAGE_PRODUCTS_CART, result);
        getProductCart();
      };

    return(
        <>
            <Button variant="link" className="cart">
                {productsCart.length > 0 ? (
                    <CartFull onClick={openCart}/>
                ) : (
                    <CartEmpty onClick={openCart}/>
                )}
            </Button>
            <div className="cart-content" style={{width: widthCartContent}}>
                <CartContentHeader closeCart={closeCart} emptyCart={emptyCart} />
                    <div className="cart-content__products">
                        {singleProductsCart.map((idProductCart, index) => (
                        <CartContentProducts
                            key={index}
                            products={products}
                            idsProductsCart={productsCart}
                            idProductCart={idProductCart}
                            increaseQuantity={increaseQuantity}
                            decreaseQuantity={decreaseQuantity}
                        />
                        ))}
                    </div>
                <CartContentFooter /* cartTotalPrice={cartTotalPrice} */ />
            </div>
        </>
    );
}

function CartContentHeader(props) {
    const { closeCart, emptyCart } = props;
  
    return (
      <div className="cart-content__header">
        <div>
          <Close onClick={closeCart} />
          <h2>Cart</h2>
        </div>
  
        <Button variant="link" onClick={emptyCart}>
          Empty
          <Garbage />
        </Button>
      </div>
    );
  }
  
  function CartContentProducts(props) {
    const {
      products: { loading, result },
      idsProductsCart,
      idProductCart,
      increaseQuantity,
      decreaseQuantity
    } = props;
  
    if (!loading && result) {
      return result.map((product, index) => {
        if (idProductCart === product.keyProductID) {
          const quantity = countDuplicatesItemArray(product.keyProductID, idsProductsCart);
          return (
            <RenderProduct
              key={index}
              product={product}
              quantity={quantity}
              increaseQuantity={increaseQuantity}
              decreaseQuantity={decreaseQuantity}
            />
          );
        }
      });
    }
    return null;
  }
  
  function RenderProduct(props) {
    const { product, quantity, increaseQuantity, decreaseQuantity } = props;
  
    return (
      <div className="cart-content__product">
        {/* <img src={`${BASE_PATH}/${product.image}`} alt={product.name} /> */}
        <div className="cart-content__product-info">
          <div>
            <h3>{product.name.substr(0, 25)}...</h3>
            {/*<p>{product.price.toFixed(2)} € / ud.</p> */}
          </div>
          <div>
            <p>In cart: {quantity} units </p>
            <div>
              <button onClick={() => increaseQuantity(product.keyProductID)}>+</button>
              <button onClick={() => decreaseQuantity(product.keyProductID)}>-</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  function CartContentFooter(props) {
    //const { cartTotalPrice } = props;
  
    return (
      <div className="cart-content__footer">
        <div>
          <p>Total: </p>
          {/* <p>{cartTotalPrice.toFixed(2)} AU$</p> */}
        </div>
        <Button>Place Order</Button>
      </div>
    );
  }