
const express=require('express');
const app=express();
const port=3000;
const mongoose = require('mongoose');
const User = require('./models/user');

app.get('/',(req,res) => {
	res.send("hello world");
})

app.listen(port,() =>{
	console.log(`Example app listen on port ${port}`)
})

mongoose.connect('')
	.then(() => console.log("Connected to MongoDB"))
	.catch(err => console.error("Could not connect to MongoDB",err));

