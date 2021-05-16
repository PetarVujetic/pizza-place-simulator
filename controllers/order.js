const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middlewares/async')
const Order = require('../models/Order')
const Ingredient = require('../models/Ingredient')
const uniqueValues = require('../utils/uniqueValues')
const numericCheck = require('../utils/numericCheck')

exports.postOrder = asyncHandler(async (req, res, next) => {
  const { firstName, lastName, address, phoneNumber, size } = req.body
  let ingArray = []

  //Check if phone number is all numeric
  if (!numericCheck(phoneNumber)) {
    return next(new ErrorResponse(`Phone number contains non numeric characters`, 400))
  }

  const order = await Order.create({ firstName, lastName, address, phoneNumber, size })

  //Add ingredients to an array that turns unique
  for (const item of req.body.ingredients) {
    const ingredient = await Ingredient.findOne({ name: item })
    ingArray.push(ingredient.id)
  }

  //Makes array unique
  ingArray = ingArray.filter(uniqueValues)

  order.ingredients = ingArray
  order.save()

  res.status(200).json({
    success: true,
    data: order
  })
})


exports.checkOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id)

  if (!order)
    return next(new ErrorResponse(`Order with the id of ${req.params.id} does not exist`, 404))

  res.status(200).json({
    success: true,
    status: `Your order is ${order.status}`
  })
})

exports.deleteOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findByIdAndDelete(req.params.id)
  if (!order)
    return next(new ErrorResponse(`Order with the id of ${req.params.id} does not exist`, 404))

  res.status(200).json({
    success: true,
    msg: "Order successfully deleted"
  })
})