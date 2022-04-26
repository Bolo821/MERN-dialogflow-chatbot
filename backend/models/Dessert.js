const mongoose = require("mongoose");
const autoIncrement = require('mongoose-auto-increment');
const { Schema } = mongoose;
autoIncrement.initialize(mongoose.connection);

const dessertSchema = new Schema({
  name: String,
  price: Number,
  image: String,
}, {id: false});

dessertSchema.plugin(autoIncrement.plugin, 'dessert');
mongoose.model("dessert", dessertSchema);
