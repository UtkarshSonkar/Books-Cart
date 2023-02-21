import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import validateProduct from "../fakeapi";
import  { RootState } from '../store'

export interface Product {
    name:string, price:number, id:string
  }
export enum ValidationState{
   Fulfilled,
   Rejected, 
   Pending 
}

export interface ProductSliceState{
    product:Product[],
    validation?: ValidationState,
    error?: string
}
  
// createasyncThunk gives free action rejected, fullfilled & pending. Hook these using extrareducers(see redux doc)  
export const addProductAsync = createAsyncThunk('products/addNewProduct', async(initialProduct: Product)=>{
    const product = validateProduct(initialProduct)
    return product
})

const initialProduct:Product[] =[
      {name:'harry-potter', price:100, id:'hp'},
      {name:'rich dad poor dad', price:150, id:'rdpd'},
      {name:'12 rules of life', price:90, id:'rol'}
  ]

const initialState : ProductSliceState = {
    product: initialProduct,
    validation: undefined,
    error:undefined
}

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers :{
       addProduct:(state, action:PayloadAction<Product>)=>{
        //newstate is an array only
        state.product.push(action.payload)
       },

       removeProduct: (state, action:PayloadAction<String>) =>({
        ...state, 
        product:state.product.filter(product=> product.id !== action.payload)
       })
    },
    extraReducers(builder) {
        builder.addCase(addProductAsync.fulfilled, (state, action )=>({
            ...state,
            validation:ValidationState.Fulfilled,
            error:undefined,
            product: [...state.product, action.payload]
        }))
        builder.addCase(addProductAsync.rejected, (state, action)=>({
           ...state,
           validation:ValidationState.Rejected,
           error:action.error.message
        }))
        builder.addCase(addProductAsync.pending, (state, action)=>({
           ...state,
           validation:ValidationState.Pending,
           error:undefined
        }))
    },
    
})

export const {addProduct, removeProduct} = productSlice.actions

export const getProductSelector = (state:RootState) => state.products.product
export const getErrorMessage =(state: RootState) => state.products.error

export default productSlice.reducer;