const express = require('express')
const { postOrder, deleteOrder, checkOrder } = require('../controllers/order')

const router = express.Router()

router.route('/order')
  .post(postOrder)

router.route('/order/:id')
  .get(checkOrder)
  .delete(deleteOrder)

module.exports = router