import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./router/authRoutes.js";
import session from "express-session";
import passport from "passport";



const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: "secret", resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// setting the cors policy 
app.use(cors({
    origin: "http://localhost:5174",  
    credentials: true                
  }));


app.use("/api/auth", authRoutes);

// setting up the db and port 

const mongodbURL = 
"mongodb+srv://NestName:NestName123@nest.hytgw.mongodb.net/?retryWrites=true&w=majority&appName=Nest";
mongoose
.connect(mongodbURL)
.then(() => {
    console.log("Connected to the database");
    const port = process.env.PORT || 3000;
    
    app.listen(port, () => console.log(`Server is running on port: ${port}`));  
    
})
.catch((error) => console.error(error));
