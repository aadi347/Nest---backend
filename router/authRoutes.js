import express from "express";
import passport from "passport";
import { signup, login, logout } from "../controller/authController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", passport.authenticate("local"), login);
router.get("/logout", logout);

export default router;
