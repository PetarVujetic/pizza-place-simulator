const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'Please add a first name'],
    maxlength: [20, 'First name can not be longer than 20 characters']
  },
  lastName: {
    type: String,
    required: [true, 'Please add a last name'],
    maxlength: [20, 'Last name can not be longer than 20 characters']
  },
  address: {
    type: String,
    required: [true, 'Please add an address'],
    maxlength: [50, 'Address can not take more than 50 characters']

  },
  phoneNumber: {
    type: Number,
    required: [true, 'Please add a phone number'],
    maxlength: [20, 'Phone number can not be longer than 20 digits']
  },
  size: {
    type: String,
    required: [true, 'Please add a pizza size'],
    enum: ['small', 'medium', 'large']
  },
  ingredients: [{
    ingredient: {
      type: String,
      required: false,
      enum: ['cheese', 'tomato sauce', 'pepperoni', 'mushrooms', 'onions', 'pineapple', 'bacon', 'olives']
    }
  }],
  status: {
    type: String,
    required: [true, 'Pizza status is not added'],
    enum: ['finished', 'pending']
  },
  createdAt: {
    type: Date,
    deault: Date.now
  }

})