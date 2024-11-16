import express, { response } from "express";
import axios from "axios";
import mongoose from "mongoose";
import { Signup } from "./models/signupModel.js";
import bcrypt from "bcrypt";

const app = express();
const port = 3000;

app.use(express.json());


const mongoDbUrl = 'mongodb+srv://NestName:NestName123@nest.hytgw.mongodb.net/?retryWrites=true&w=majority&appName=Nest';
mongoose
.connect(mongoDbUrl)
.then(() => {
    console.log("your database is connected");
    app.listen(port, () => {
        console.log(`app is up and running on ${port}`);
    });
})

.catch((error) => {
    console.log(error);
});

app.post('/signup', async (req, res) => {
    try {
        const { name, username, password } = req.body;
        console.log(name);
        console.log(username);
        console.log(password);
    
    
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newUser = new Signup({name, username, password: hashedPassword});
        await newUser.save();
        res.status(201).send('user resgister successfully');
    } catch (error) {
        console.log(error);
        res.status(400).send('error registering user');
    }
    
   
});

app.post('/login', async (req,res) => {
    try {
        const {username, password} = req.body;

        // finding the user by username 
        
        
        const user = await Signup.findOne({username});
        if(!user){
        res.status(400).send("Error finding username or password, either it should be invalid. Try another one !");
        }

        // checking the passoword us authentic or not

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            res.status(400).send("invalid password or username");
        }

        res.status(200).send("Login Succesfull");
    } catch (error) {
        console.log(error);
        res.status(400).send('error while login');
    }
});



