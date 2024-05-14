const mongoose = require("mongoose");
const { log } = require("console");
const dotenv = require("dotenv");
dotenv.config();

const connectionString = process.env.CONNECTION_STRING;

const connectToDatabase = () => {
  mongoose
    .connect(connectionString)
    .then(() => {
      log("Connected to Instagram Server");
    })
    .catch((err) => {
      log(err);
    });
};

module.exports = connectToDatabase;
