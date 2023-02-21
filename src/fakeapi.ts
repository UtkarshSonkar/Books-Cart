import { Product } from "./Products/Product.slice";

const validateProduct =(product:Product): Promise<Product>=> new Promise((resolve, reject) => { setTimeout(() => {
        if(product.name.length===0){
            reject('Enter the name')
          }
          if(product.price <= 0){
            reject('price incorrect')
          }
          resolve(product)

    }, 1000);
})

export default validateProduct