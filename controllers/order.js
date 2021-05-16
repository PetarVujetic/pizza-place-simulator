const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middlewares/async')
const Order = require('../models/Order')
const Ingredient = require('../models/Ingredient')
const uniqueValues = require('../utils/uniqueValues')
const numericCheck = require('../utils/numericCheck')
const sizeAdjust = require('../utils/sizeAdjust')

// @desc  Create an order
//@route  POST /api/public/order
//@access Public
exports.postOrder = asyncHandler(async (req, res, next) => {
  const { firstName, lastName, address, phoneNumber, size } = req.body
  let ingredients = []
  let price = 0
  let time = 0

  //Returns time and price of the chosen size
  const pizzaSize = sizeAdjust(size)
  price += pizzaSize.price
  time += pizzaSize.time

  //Check if phone number is all numeric
  if (!numericCheck(phoneNumber)) {
    return next(new ErrorResponse(`Phone number contains non numeric characters`, 400))
  }

  //Add ingredients to an array that turns unique
  for (const item of req.body.ingredients.filter(uniqueValues)) {
    const ingredient = await Ingredient.findOne({ name: item })
    time += ingredient.time
    ingredients.push(ingredient.id)
  }

  //Create order
  const order = await Order.create({ firstName, lastName, address, phoneNumber, size, ingredients, price, time })

  res.status(200).json({
    success: true,
    data: order
  })
})


// @desc  Get an order
//@route  GET /api/public/order/:id
//@access Public
exports.getRecent = asyncHandler(async (req, res, next) => {
  const orders = await Order.find().sort('-createdAt').limit(5)

  res.status(200).json({
    success: true,
    data: orders
  })
})

// @desc  Get an order
//@route  GET /api/public/order/:id
//@access Public
exports.checkOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id)

  if (!order)
    return next(new ErrorResponse(`Order with the id of ${req.params.id} does not exist`, 404))

  res.status(200).json({
    success: true,
    status: `Your order is ${order.status}`
  })
})


// @desc  Delete an order
//@route  DELETE /api/public/order/:id
//@access Public
exports.deleteOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id)

  if (!order)
    return next(new ErrorResponse(`Order with the id of ${req.params.id} does not exist`, 404))

  if (order.status === 'finished')
    return next(new ErrorResponse(`You can not cancel a finished order`, 400))

  order.delete()

  res.status(200).json({
    success: true,
    msg: "Order successfully deleted"
  })
})