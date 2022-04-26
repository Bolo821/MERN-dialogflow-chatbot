const mongoose = require("mongoose");
const autoIncrement = require('mongoose-auto-increment');
const { Schema } = mongoose;

autoIncrement.initialize(mongoose.connection);

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  permission: String,
  avatar: String,
}, {id: false});

userSchema.plugin(autoIncrement.plugin, 'user');

mongoose.model("user", userSchema);
