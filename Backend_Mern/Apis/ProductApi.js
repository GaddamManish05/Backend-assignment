import exp from "express";

export const productapp = exp.Router(); 
// which creates a mini express http server

let products = [] 
// which is used to store in memory data

productapp.get('/products', (req,res) => {  
    // these route is used to get products
    res.status(200).json({message : " Your Products ", Products: products })
})
productapp.get('/products/:id',(req,res)=> { 
    // these route is used to get products by id
    let ProductId = Number(req.params.id);
    
    let FindOfProd = products.find(product => product.productId === ProductId) 
    // find products
    if(!FindOfProd){
        return res.status(404).json({message : " Product Not Found"});
    }
    return res.status(200).json({message : "Product" , Product : FindOfProd});
})
productapp.get('/products-brand/:brand',(req,res) => { 
    // these is used to get product by brand name
    let BrandName = req.params.brand
    let FindBrand = products.find(product => product.brand.toLowerCase() === BrandName.toLowerCase()); // find brand name in product[]
    if(!FindBrand){ 
        // check wheather it is present or not 
        return res.status(404).json({message : "Product Nit found"}); 
        //response if not
    }
    return res.status(200).json({message : "Product Found" , Product : FindBrand}); 
    // response if yes 
})
productapp.post('/products', (req,res) => { 
    // these route is used to 
    let newProduct = req.body

    products.push(newProduct) // add into product[]
    // add new product to in meory data
    res.status(200).json({message : "Product cerated" ,products}) // response that product created
})
productapp.put('/products/id', (req,res) => { 
    // modifying the data by these route
    let updatedProduct = req.body // retrieve data from req.body
    let ProductIdx = products.findIndex(product => product.productId === updatedProduct.productId); // find the index of product 
    if(ProductIdx === -1){ // if not present then it set default as -1
        // if not present 
        return res.status(404).json({message : "Product Not Found"})
    }
    let deleteProduct = products.splice(ProductIdx,1,updatedProduct) // splice() which updates the product[] (delete or insert)
    return res.status(200).json({message : "Product Modified"})  // signals modify
})
productapp.delete('/products-delete/:id', (req,res) => { 
    // these route is used to delete 
    let ProductId = Number(req.params.id) // retrieve product id from id (req.body)
    let FindIndex = products.findIndex(product => product.productId === ProductId) // find the index of product
    // find the product by index
    if(FindIndex === -1){ 
        // if not then return response 
        return res.status(404).json({message : "Product Not Found"}); 
    }
    // as not present
    products.splice(FindIndex,1);
    return res.status(200).json({message : "Product Deleted" , ProductId : ProductId}); 
    // response it by present message 
})
