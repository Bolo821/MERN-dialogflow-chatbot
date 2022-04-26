const mongoose = require("mongoose");
const autoIncrement = require('mongoose-auto-increment');
const { Schema } = mongoose;
autoIncrement.initialize(mongoose.connection);

const drinkSchema = new Schema({
  name: String,
  price: Number,
  image: String,
}, {id: false});

drinkSchema.plugin(autoIncrement.plugin, 'drink');
mongoose.model("drink", drinkSchema);
