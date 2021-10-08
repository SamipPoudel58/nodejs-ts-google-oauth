import express from "express";
import mongoose from "mongoose";
import { MONGO_URI } from "./utils/secrets";
import authRoutes from "./routes/authRoutes";

const app = express();

app.set("view engine", "ejs");

// connect to mongodb
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
