const mongoose = require("mongoose");
const autoIncrement = require('mongoose-auto-increment');
const { Schema } = mongoose;

autoIncrement.initialize(mongoose.connection);

const orderSchema = new Schema({
  user: Number,
  drink: Array,
  starter: Array,
  meal: Array,
  dessert: Array,
  special: Array,
  status: String,
  qrcode: String,
  orderDate: Date,
  deleted: Boolean,
}, {id: false});

orderSchema.plugin(autoIncrement.plugin, 'order');

mongoose.model("order", orderSchema);
