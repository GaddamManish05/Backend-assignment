

//body parsing middleware

// creating middleware 

import exp from 'express'

export const UserApp = exp.Router()
// storing users data
let users = [];
//using middel wares
function middleware1(req,res,next){ // middleware
    console.log("middleware 1 executed");
    next(); // throws to next middleware or route 
}
UserApp.use(middleware1);
// get request handling (read user)
UserApp.get('/users',middleware1,(req,res)=>{
    // send http request to client
    res.status(200).json({message : 'all users', payload : users}); // response

})

// these route is used to create a user 
UserApp.post('/user',(req,res)=>{
    let newUser = req.body // retrieve data from req body
    users.push(newUser) // push into users[]
    res.json({message:"User Created Successfully",payload : users}) // response from route
})

//put req handling (update user)
UserApp.put('/users/id',(req,res)=>{
    let updatedUsers = req.body // retrieve data from req body
    
    let CheckUsersIndex = users.findIndex(user => user.id === updatedUsers.id) // finds the index of users which matches id
    if(CheckUsersIndex === -1){ // if user not found 
       res.status(404).json({message : "User Not Found"}) // then it responses user not found
    }else{ // if present 
    let deleteUser = users.splice(CheckUsersIndex,1,updatedUsers); // it modify the user by splice()
    res.status(200).json({message : "User Modified"}) // response if user modified
    }
})
UserApp.get('/users/:id',(req,res) => {

    let userId = Number(req.params.id)  // retrieve data from req.bdy by params() => js object 
    let user = users.find(userObj => userObj.id === userId); // find the index of user 
    if(!user){ // check if user found or not
        return res.status(404).json({message : 'User Not Found'}) // if not present 
    }
    res.status(200).json({message : 'User Found', payload : user}) // if present 
})

// these route is to delete the user from users[]
UserApp.delete('/users/:id',(req,res)=>{
    let deleteUser = Number(req.params.id) // retrieves data(id) from req.body
    let user = users.findIndex(user => user.id === deleteUser) // find the idex of user id
    if(user === -1){ // check if users exists or not
        return res.status(404).json({message : 'User Not Found'})  // if not present
    }
    users.splice(deleteUser,1) // delete the user 
    return res.status(200).json({message : "Deleted User" , user : deleteUser}) // response is present 
    
})
