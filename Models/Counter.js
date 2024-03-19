const mongoose = require('mongoose');

const counterSchema = new mongoose.Schema({
    _id: String, // We don't specify this as ObjectId to keep it simple
    sequence_value: { type: Number, default: 1000 } // Start from 1000
 });
 
 // Model for the counter document
 const Counter = mongoose.model('Counter', counterSchema);

 module.exports = Counter;
