const mongoose = require("mongoose");
const autoIncrement = require('mongoose-auto-increment');
const { Schema } = mongoose;
autoIncrement.initialize(mongoose.connection);

const specialSchema = new Schema({
  name: String,
  price: Number,
  image: String,
}, {id: false});

specialSchema.plugin(autoIncrement.plugin, 'special');
mongoose.model("special", specialSchema);
