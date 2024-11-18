import express, { response } from "express";
import axios from "axios";
import mongoose from "mongoose";
import { Signup } from "./models/signupModel.js";
import { FlatRegistration } from "./models/FlatRegistrationModel.js";
import bcrypt from "bcrypt";
import cors from "cors";


const app = express();
const port = 3000;

app.use(cors());

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
        const { name, email, password } = req.body;
        console.log(name);
        console.log(email);
        console.log(password);
    
    
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newUser = new Signup({name, email, password: hashedPassword});
        await newUser.save();
        res.status(201).send('user resgister successfully');
    } catch (error) {
        console.log(error);
        res.status(400).send('error registering user');
    }
    
   
});

app.post('/login', async (req,res) => {
    try {
        const {email, password} = req.body;

        // finding the user by username 
        
        
        const user = await Signup.findOne({email});
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


//Getting the data from the FlatRegistration FORM from the frontend

app.post("/flatregistartion", async (req, res) => {
    try {
        const {flatType, rent, location, parking, utilities, houseName, deposit, carpetArea} = req.body;
        console.log(flatType, rent, location, parking, utilities, houseName, deposit, carpetArea);
    
        const newproperty = new FlatRegistration({flatType, rent, location, parking, utilities, houseName, deposit, carpetArea});
        await newproperty.save();
        res.status(200).send("Property information saved succesfully");
    } catch (error) {
        console.log(error);
        res.status(400).send("Error ! while saving the property information.")
    }
});


