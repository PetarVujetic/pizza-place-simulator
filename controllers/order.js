const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middlewares/async')
const Order = require('../models/Order')
const Ingredient = require('../models/Ingredient')
const uniqueValues = require('../utils/uniqueValues')
const numericCheck = require('../utils/numericCheck')
const sizeAdjust = require('../utils/sizeAdjust')
const Queue = require('../models/Queue')

// @desc  Create an order
//@route  POST /api/public/order
//@access Public
exports.postOrder = asyncHandler(async (req, res, next) => {
  let place
  await Queue.estimatedDocumentCount((err, count) => {
    if (err) return next(new ErrorResponse('Server could not get the document count', 500))
    place = count
  })

  if (place > 14)
    return res.status(405).json({
      success: false,
      msg: "Come back later, we can not accept more orders at this time"
    })

  const { contact, pizzas } = req.body
  let ingredients = []
  let price = 0
  let time = 0
  let timeTotal = 0


  for (let i = 0; i < pizzas.length; i++) {
    //Returns time and price of the chosen size
    let pizzaSize = sizeAdjust(pizzas[i].size)
    price += pizzaSize.price
    time = pizzaSize.time
    timeTotal += pizzaSize.time

    //Add ingredients to an array that turns unique
    for (const ing of pizzas[i].ingredients.filter(uniqueValues)) {
      const ingredient = await Ingredient.findOne({ name: ing })
      time += ingredient.time
      ingredients.push(ingredient.id)
    }
    pizzas[i].ingredients = ingredients
    pizzas[i].time = time
  }


  //Check if phone number is all numeric
  if (!numericCheck(contact.phoneNumber)) {
    return next(new ErrorResponse(`Phone number contains non numeric characters`, 400))
  }

  //Create order
  const order = await Order.create({ contact, pizzas, price, timeTotal })
  const queue = await Queue.create({ OrderId: order.id, time: timeTotal, place: place })


  res.status(200).json({
    success: true,
    id: order.id,
    placeInQueue: place,
    time: time
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