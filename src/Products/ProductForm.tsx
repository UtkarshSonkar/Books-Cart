import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../store.hooks";
import { addProduct, addProductAsync, getErrorMessage, Product } from "./Product.slice";

const ProductForm: React.FunctionComponent =()=>{

const dispatch = useAppDispatch()
const errorMessage = useSelector(getErrorMessage)

const [product, setProduct]= useState<Product>({
  name:'',
  price:0,
  id:''
})

const handleChange=({target:{name, value}}: React.ChangeEvent<HTMLInputElement>)=> setProduct(prev =>{
  (prev as any)[name]=value
  const newValue= {...prev};
  return newValue
})

const handleSubmit =(e : React.FormEvent)=>{
  //prevent default is used because formevent modifies the url based on entyries in form
  e.preventDefault()
  dispatch(addProductAsync(product))
 
  
}

 const {name, price, id} = product
return(<>
  <h2>Book Form</h2>
  {errorMessage && <span>error: {errorMessage}</span>}  
  <form onSubmit={handleSubmit}>
  <input style={{border: errorMessage ? '1px solid red':'1px solid black'}} type="text" placeholder="Book name" name="name" value={name} onChange={handleChange}/>
  <input style={{border: errorMessage ? '1px solid red':'1px solid black'}} type="number" placeholder="Price" name="price" value={price} onChange={handleChange}/>
  <input style={{border: errorMessage ? '1px solid red':'1px solid black'}} type="text" placeholder="Id" name="id" value={id} onChange={handleChange}/>
  <button style={{backgroundColor: errorMessage? 'red': 'grey' }}>Add book</button>
  </form>
</>)
} 

export default ProductForm

function assProductAsync(product: Product): any {
  throw new Error("Function not implemented.");
}
