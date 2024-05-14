const { log } = require("console");
const express = require("express");
const connectToDatabase = require("./database");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const userRouter = require("./Routers/users");
const postRouter = require("./Routers/Post/post");
const path = require("path");

dotenv.config();

const Port = process.env.PORT;

const app = express();

connectToDatabase();
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        "http://localhost:5173",
        "https://flamefeed.vercel.app",
      ];
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("CORS policy violation"));
      }
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/user", userRouter);
app.use("/api/v1/post", postRouter);

// Handling all other routes
app.all("*", (req, res) => {
  res.status(404).send({
    success: false,
    message: "API not found",
  });
});

app.listen(Port, () => {
  log(`Server is up and running at ${Port}`);
});
