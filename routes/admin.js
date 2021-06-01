const express = require('express')
const router = express.Router()
const VerifyToken = require('../middlewares/VerifyToken')

const { start, login } = require("../controllers/admin")

router.route('/start', VerifyToken)
  .post(start)

router.route('/login')
  .post(login)

module.exports = router
