import mongoose from 'mongoose'
//const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
async function connectToMongoDB(url) {
  return mongoose.connect(url);
}

/*module.exports = {
  connectToMongoDB,
};*/

export default connectToMongoDB;