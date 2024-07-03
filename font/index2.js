
import http from 'http'
import express from 'express'
import fs from 'fs'
import mongoose from 'mongoose'

//const http =require ('http')
//const fs= require ('fs')
const app = express();

mongoose
.connect("mongodb://127.0.0.1:27017/csit" )
.then(()=>console.log("mongodb connected"))
.catch(err=>console.log("mongo error",err));


  
  const User = mongoose.model("user", userSchema);
  
  module.exports = User;

//app.get("/login",(req,res)=>{
//    res.render("");
//})

//const fileContent =fs.readFileSync('Login.html')
//const server =http.createServer((req,res)=>{
  //res.writeHead(200,{'Content-type':'text/html'
    //});
    //res.end(fileContent)
//})

    
    
  

app.post("/login",async (req , res) => {
    const { username, password } = req.body;
    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const database = client.db('csit');
        const usersCollection = database.collection('adminlogin');

        // Find user by username
        const user = await usersCollection.findOne({ username });

        if (user) {
            // Compare hashed password
            const match = await bcrypt.compare(password, adminlogin.passwordHash);
            if (match) {
                // Passwords match, login successful
                res.status(200).send('Login successful');
            } else {
                // Passwords do not match
                res.status(401).send('Incorrect password');
            }
        } else {
            // User not found
            res.status(404).send('User not found');
        }
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).send('Internal Server Error');
    } finally {
        await client.close();
    }
});


server.listen(80,'5',()=>{
    console.log("listeening on port 80")
})