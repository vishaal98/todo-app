// required mongoose
const mongoose = require("mongoose");

// connected to the db
mongoose.connect("mongodb://127.0.0.1:27017/todolist_db");

// acquired connection to db
const db = mongoose.connection;

//display message on error
db.on("error", console.error.bind(console, "Error connecting to MongoDB"));

//display message if connction successfull
db.once("open", function () {
  console.log("Connected to Database MongoDB");
});

module.exports = db;
