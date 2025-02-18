import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Signup } from "../models/Signup.js";
import bcrypt from "bcryptjs";

passport.use(
  new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
    try {
      const user = await Signup.findOne({ email });
      if (!user) return done(null, false, { message: "User not found" });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return done(null, false, { message: "Incorrect password" });

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await Signup.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});
