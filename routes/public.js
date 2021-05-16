const express = require('express')
const { postOrder, deleteOrder, checkOrder, getRecent } = require('../controllers/order')

const router = express.Router()

router.route('/order')
  .post(postOrder)
  .get(getRecent)

router.route('/order/:id')
  .get(checkOrder)
  .delete(deleteOrder)

module.exports = router