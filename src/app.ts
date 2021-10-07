import express from "express";
import mongoose from "mongoose";
import { MONGO_URI } from "./utils/secrets";

const app = express();

// connect to mongodb
mongoose.connect(MONGO_URI, () => {
  console.log("connected to mongodb");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("App listening on port: " + PORT);
});
