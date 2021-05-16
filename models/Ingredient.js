const mongoose = require('mongoose')

const IngredientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    enum: ['cheese', 'tomato sauce', 'pepperoni', 'mushrooms', 'onions', 'pineapple', 'bacon', 'olives']
  },
  price: {
    type: Number,
    required: true
  },
  time: {
    type: Number,
    required: true
  }
})

module.exports = mongoose.model('Ingredient', IngredientSchema)
