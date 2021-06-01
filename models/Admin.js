const mongoose = require('mongoose')

const AdminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    default: 'admin'
  },
  password: {
    type: String,
    required: true,
  },
  moneyEarned: {
    type: Number
  },
  workingTime: {
    type: Number
  },
  // lastStart,
  // topFive
})

module.exports = mongoose.model('Admin', AdminSchema)
