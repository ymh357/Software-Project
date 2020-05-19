import React, {useEffect, useState} from 'react';
import TopMenu from './Components/TopMenu/TopMenu';
import Products from './Components/Products';
//import { Search } from './Components/Search/Search';
import useFetch from './hooks/useFetch';
import {urlApiProducts} from './utils/constants';
import {STORAGE_PRODUCTS_CART} from './utils/constants'

function App() {
  
    const products = useFetch(urlApiProducts, null);    
    const [productsCart, setProductsCart] = useState([]);

    //the following 2 blocks are to keep items in cart when refreshing the page
    useEffect(() => {
      getProductCart();
    }, []);

    const getProductCart = () =>{
      const idsProducts = localStorage.getItem(STORAGE_PRODUCTS_CART);
      
      if(idsProducts){
        const idsProductsSplit = idsProducts.split(",");
        setProductsCart(idsProductsSplit);
      }else{
        setProductsCart([]);
      }
    }


    //to add product in the cart
    const addProductCart = (id, name) =>{
      const idsProducts = productsCart;
      idsProducts.push(id);
      setProductsCart(idsProducts);
      localStorage.setItem(STORAGE_PRODUCTS_CART, productsCart);
      getProductCart();
    }

  return (
    <div className="App">
      <TopMenu 
        productsCart={productsCart}
        getProductCart={getProductCart}
        products={products}
      />
      {/* <Search/> */}
      <Products products={products} addProductCart={addProductCart}/>
    </div>
  );
}

export default App;
