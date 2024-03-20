
require("dotenv").config();
const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const userRouter = require("./route/userRoute");

const app = express();
const PORT = process.env.PORT || 7000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.API_SECRET_KEY, 
    resave: false,
    saveUninitialized: false,
  })
);


app.get("/", (req, res) => {
  res.status(200).json({ msg: "Hello everyone" });
});



app.use("/api/v1", userRouter);


mongoose
  .connect(process.env.MONGO_URI, {
    
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));


app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
