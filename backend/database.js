// This file handles connecting to a DB
const mongoose = require('mongoose');
require('dotenv').config()

/* Old mongoDB link
const DATABASE_CONNECTION = `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@${process.env.DB_LOCATION}/myFirstDatabase?retryWrites=true&w=majority`
console.log(DATABASE_CONNECTION)*/

const connect = async function () {
  try {
    /* Old stuff that doesnt work, i don't know why.
    await mongoose.connect(
      DATABASE_CONNECTION, {useNewUrlParser: true, useUnifiedTopology: true}
    );*/

    await mongoose.connect("mongodb+srv://cluster0.svtt1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
      user: process.env.USERNAME, 
      pass: process.env.PASSWORD, 
      useNewUrlParser: true, 
      useUnifiedTopology: true
    });
    console.log('Successfully connected to MongoDB');
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connect;
