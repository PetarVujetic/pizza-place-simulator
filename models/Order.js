const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
  contact: {
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
      type: String,
      required: [true, 'Please add a phone number'],
      maxlength: [20, 'Phone number can not be longer than 20 digits']
    },
  },
  pizzas: [{
    size: {
      type: String,
      required: [true, 'Please add a pizza size'],
      enum: ['small', 'medium', 'large']
    },
    ingredients: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ingredient'
      }],
    time: {
      type: Number,
      required: true
    },
  }],
  price: {
    type: Number,
    required: true
  },
  timeTotal: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    default: 'being made',
    required: [true, 'Pizza status is not added'],
    enum: ['finished', 'being made']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },

})

module.exports = mongoose.model('Order', OrderSchema)
