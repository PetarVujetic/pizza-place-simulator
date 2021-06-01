const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middlewares/async')
const Order = require('../models/Order')
const Queue = require('../models/Queue')
const Ingredients = require('../models/Ingredient')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Admin = require('../models/Admin')
const VerifyToken = require('../middlewares/VerifyToken')

// @desc  Login as admin
//@route  POST /api/admin/login
//@access Public
exports.login = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body
  const admin = await Admin.findOne({ username: username })

  bcrypt.compare(password, admin.password, function (err, result) {
    if (result) {
      const token = jwt.sign({ id: admin._id }, process.env.SECRET);
      res.status(200).json({
        success: true,
        token: token
      })
    }
    else res.status(400).json({
      success: false,
      msg: "Username or password did not match"
    })
  });

})


// @desc  Start making orders
//@route  POST /api/admin/start
//@access Private
exports.start = asyncHandler(async (req, res, next) => {
  let admin = await Admin.findOne({})
  async function doOrder() {
    let queue = await Queue.findOne({})
    if (queue) {
      let id = queue.OrderId
      let order = await Order.findById(id)
      admin.moneyEarned += order.price
      await admin.save()
      console.log(`\nOrder id: ${order.id}`.bold)
      console.log("------------------------".yellow);
      for (let i = 0; i < order.pizzas.length; i++) {
        let time = order.pizzas[i].time
        setTimeout(async () => {
          await queue.delete()
          order.status = "finished"
          await order.save()
          console.log(`${order.pizzas[i].size} pizza is finished`.yellow)
        }, time);
      }
      setTimeout(() => {
        console.log("------------------------".yellow);
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