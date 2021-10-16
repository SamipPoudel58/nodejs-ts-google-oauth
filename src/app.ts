import express from "express";
import mongoose from "mongoose";
import { COOKIE_KEY, MONGO_URI } from "./utils/secrets";
import authRoutes from "./routes/authRoutes";
import "./config/passport";
import cookieSession from "cookie-session";
import passport from "passport";

const app = express();

app.set("view engine", "ejs");

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [COOKIE_KEY],
  })
);

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(MONGO_URI, () => {
  console.log("connected to mongodb");
});

app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.render("home");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("App listening on port: " + PORT);
});
