import React from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../store.hooks";
import { getProductSelector, Product, removeProduct } from "./Product.slice";
import { addToCart } from "../Cart/cart.slice";

const ProductList:React.FC =()=>{
    
    const dispatch = useAppDispatch()
    const books = useSelector(getProductSelector)
    
    const removeFromStore = (id:string ) => dispatch(removeProduct(id))
    
    const addToCartHandler = (books: Product) => dispatch(addToCart(books))

    return(
        <div>
            <h2>Book Fair</h2>
                {books.map(list=> 
                <div key={list.id}>
                    <span>{`${list.name}:${list.price}`}</span>
                    <button onClick={ () => addToCartHandler(list)}>Add to Cart</button>
                    <button onClick={ () => removeFromStore(list.id) }>Remove book</button>
                </div>)}
        </div>
    )
}

export default ProductList