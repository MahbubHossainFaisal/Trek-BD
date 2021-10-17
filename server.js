const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config({path: './config.env'})

const app = require('./app.js')


//connecting to database
const DB = process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE_PASSWORD)

mongoose.connect(DB,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(con =>{
   
    console.log('DB connection successful')
})

//console.log(process.env)
//server
const port = process.env.PORT || 8000;
app.listen(port, ()=>{
    console.log(`App is running on port ${port}...`)
})