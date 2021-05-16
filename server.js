const express = require('express')
const morgan = require('morgan')
const dotenv = require('dotenv')
const colors = require('colors')
const dbConnect = require('./config/db')
const app = express()
dbConnect()

//Body parser
app.use(express.json())

//Logger
if (process.env.NODE_ENV == "development") {
  console.log("Morgan Freeman listening for activity...".bgBlack);
  app.use(morgan('dev'))
}

//Load vars
dotenv.config({ path: './config/config.env' })


const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold);
})
