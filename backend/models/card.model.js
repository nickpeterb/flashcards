const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cardSchema = new Schema({
    side1: {type: String, required: true},
    side2: {type: String, required: true},
    level: {type: Number, required: true}
});

const Card = mongoose.model('Card', cardSchema);

module.exports = Card;