const express = require('express')
const dotenv = require('dotenv')
const colors = require('colors')
const db = require('./config/db')
const app = express()

//Load vars
dotenv.config({ path: './config/config.env' })

db()

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold);
})
