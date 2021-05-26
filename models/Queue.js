const mongoose = require('mongoose')

const QueueSchema = new mongoose.Schema({
  OrderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order'
  },
  time: {
    type: Number,
    required: true
  },
  place: {
    type: Number
  }
})

module.exports = mongoose.model('Queue', QueueSchema)
