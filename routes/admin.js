const express = require('express')
const router = express.Router()

const { start } = require("../controllers/admin")

router.route('/start')
  .post(start)

module.exports = router
