const express = require('express')
const errorHandler = require('./middlewares/error')
const morgan = require('morgan')
const dotenv = require('dotenv')
const colors = require('colors')
const dbConnect = require('./config/db')
const app = express()

//Load vars
dotenv.config({ path: './config/config.env' })
const PORT = process.env.PORT || 8000

dbConnect()

//Middlewares
app.use(errorHandler)

//Body parser
app.use(express.json())

//Logger
if (process.env.NODE_ENV == "development") {
  console.log("Morgan Freeman listening for activity...".bgBlack);
  app.use(morgan('dev'))
}

//Route files
const publicRouter = require('./routes/public')


//Mount routers
app.use('/api/public', publicRouter)


app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold);
})
