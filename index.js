const express = require('express');
const app = express()
const Port = process.env.PORT || 5000;
const userController = require('./controller/userController')


app.use(express.json())
app.use('/user', userController)


app.get('/', (req, res) =>{
    res.json({ message: "Welcome Random User API"})
})







app.listen(Port, () =>{
    console.log(`Server Running on ${Port}`)
})