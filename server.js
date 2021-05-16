const express = require('express')
const errorHandler = require('./middlewares/error')
const morgan = require('morgan')
const dotenv = require('dotenv')
const colors = require('colors')
const dbConnect = require('./config/db')
const app = express()

//Load vars
dotenv.config({ path: './config/config.env' })

dbConnect()

//Route files
const publicRouter = require('./routes/public')

//Body parser
app.use(express.json())

//Logger
if (process.env.NODE_ENV == "development") {
  console.log("Morgan Freeman listening for activity...".bgBlack);
  app.use(morgan('dev'))
}



//Mount routers
app.use('/api/public', publicRouter)

//Middlewares
app.use(errorHandler)

const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold);
})
