const mongoose = require("mongoose");
const autoIncrement = require('mongoose-auto-increment');
const { Schema } = mongoose;

autoIncrement.initialize(mongoose.connection);

const mealSchema = new Schema({
  name: String,
  price: Number,
  image: String,
}, {id: false});

mealSchema.plugin(autoIncrement.plugin, 'meal');

mongoose.model("meal", mealSchema);
