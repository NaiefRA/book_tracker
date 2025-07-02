const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const userRoutes = require("./routes/userRoutes");
const bookRoutes = require("./routes/bookRoutes");
const auth = require("./middleware/authMiddleware");

require("dotenv").config();

const app = express();

app.use(cookieParser());
app.use(
  cors({
    origin: [
      "https://book-tracker-naiefra.netlify.app",
      "http://localhost:3000",
      "https://book-tracker-beige.vercel.app",
    ], // Replace with your actual Netlify URL
    credentials: true, // This is crucial for cookies
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.method, req.path, req.hostname, req.cookies);
  next();
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("listening on port - " + process.env.PORT);
    });
  })
  .catch((err) => {
    console.log("db connection err - " + err);
    process.exit(1);
  });

app.use("/auth", userRoutes);
app.use("/books", auth, bookRoutes);
