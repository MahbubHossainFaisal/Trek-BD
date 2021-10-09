const express = require('express')

const morgan = require('morgan')
const tourRouter = require('./Routes/tourRoutes.js')
const userRouter = require('./Routes/userRoutes.js')

const app = express()


//middleware morgan

//middleware to make a body property of req object while post request
app.use(morgan('dev'))
app.use(express.json())

app.use('/api/v1/tours',tourRouter)
app.use('/api/v1/users',userRouter)


module.exports = app