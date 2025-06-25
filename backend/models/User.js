const mongoose = require("mongoose"); //Brings in the Mongoose library so you can define schemas and interact with MongoDB in an organized way.

const userSchema = new mongoose.Schema({
  //userSchema Specifies the structure for each user document in the database:
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["admin", "editor", "user"],
    default: "user",
  },
});

//This line creates and exports a Mongoose model called User, which corresponds to a users collection in MongoDB.
module.exports = mongoose.model("User", userSchema);
