const mongoose = require("mongoose");
const autoIncrement = require('mongoose-auto-increment');
const { Schema } = mongoose;
autoIncrement.initialize(mongoose.connection);

const starterSchema = new Schema({
  name: String,
  price: Number,
  image: String,
}, {id: false});

starterSchema.plugin(autoIncrement.plugin, 'starter');
mongoose.model("starter", starterSchema);
