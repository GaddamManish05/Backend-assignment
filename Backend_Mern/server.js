import express from "express";
import {UserApp} from './Apis/UserApi.js'
import {productapp} from './Apis/ProductApi.js'
const app = express(); // express() functions stores in app

app.listen(3001, () => { // created http server which is at 3001
  console.log("HTTP server listening on port 3001"); 
});
//body parsing middleware
app.use(express.json())
// creating middleware for user and products
app.use('/user-api',UserApp) // user-api for only user routes
app.use('/product-api',productapp) //  productr-api for only user routes