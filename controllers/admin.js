const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middlewares/async')
const Order = require('../models/Order')
const Queue = require('../models/Queue')
const Ingredients = require('../models/Ingredient')

// @desc  Create an order
//@route  POST /api/public/order
//@access Public
exports.start = asyncHandler(async (req, res, next) => {

  async function doOrder() {
    let queue = await Queue.findOne({})
    if (queue) {
      let id = queue.OrderId
      let order = await Order.findById(id)
      let flag = 0
      console.log(`Order id: ${order.id}`.bold)

      for (let i = 0; i < order.pizzas.length; i++) {
        let time = order.pizzas[i].time
        setTimeout(async () => {
          await queue.delete()
          order.status = "finished"
          await order.save()
          console.log(`${order.pizzas[i].size} pizza is finished`.underline.yellow)
          flag += 1
        }, time);
      }
      setTimeout(() => {
        doOrder()
      }, queue.time);
    }
    else {
      setTimeout(() => {
        doOrder()
      }, 5000);
    }
  }

  doOrder()
})