const mongoose = require("mongoose");
const autoIncrement = require('mongoose-auto-increment');
const { Schema } = mongoose;

autoIncrement.initialize(mongoose.connection);

const tableSchema = new Schema({
  table: String,
  qrcode: String,
  used: Boolean,
}, {id: false});

tableSchema.plugin(autoIncrement.plugin, 'table');

mongoose.model("table", tableSchema);
