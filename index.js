import express from "express";
import axios from "axios";
import mongoose from "mongoose";
import { Signup } from "./models/signupModel.js";
import { FlatRegistration } from "./models/FlatRegistrationModel.js";
import bcrypt from "bcrypt";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Session and Passport setup
app.use(
  session({
    secret: "nestsecret",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// MongoDB connection
const mongoDbUrl =
  "mongodb+srv://NestName:NestName123@nest.hytgw.mongodb.net/?retryWrites=true&w=majority&appName=Nest";
mongoose
  .connect(mongoDbUrl)
  .then(() => {
    console.log("Database connected");
    app.listen(port, () => {
      console.log(`App running on port ${port}`);
    });
  })
  .catch((error) => console.error(error));

// Passport Local Strategy
passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    async (email, password, done) => {
      try {
        const user = await Signup.findOne({ email });
        if (!user) return done(null, false, { message: "Incorrect email" });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid)
          return done(null, false, { message: "Incorrect password" });

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

// Serialize and Deserialize User
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await Signup.findById(id);
    done(null, user);
  } catch (error) {
    done(error, false);
  }
});

// Routes
app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new Signup({ name, email, password: hashedPassword });
    await newUser.save();
    res.status(201).send("User registered successfully");
  } catch (error) {
    console.error(error);
    res.status(400).send("Error registering user");
  }
});

app.post("/login", passport.authenticate("local"), (req, res) => {
  res.status(200).send("Login successful");
});


app.get("/user", (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json(req.user);
  } else {
    res.status(401).send("Not authenticated");
  }
});

app.post("/flatregistration", async (req, res) => {
  try {
    const { flatType, rent, location, parking, utilities, houseName, deposit, carpetArea } = req.body;
    const newProperty = new FlatRegistration({
      flatType,
      rent,
      location,
      parking,
      utilities,
      houseName,
      deposit,
      carpetArea,
    });
    await newProperty.save();
    res.status(200).send("Property information saved successfully");
  } catch (error) {
    console.error(error);
    res.status(400).send("Error saving property information");
  }
});
