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

// tour schema
const tourSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true,'A tour must have a name'],
        unique: true
    },
    rating:{
        type: Number,
        default: 4.5
    },
    price:{
        type:Number,
        required: [true,'A tour must have price']
    }
})


//model of tourSchema
const Tour = mongoose.model('Tour', tourSchema)


//creating document from Tour model
const testTour = new Tour({
    name: 'The Park Camper',
    price: 2500
})

testTour.save().then(doc =>{
    console.log(doc)
}).catch(err =>{
    console.log('Error: ',err)
})

//console.log(process.env)
//server
const port = process.env.PORT || 8000;
app.listen(port, ()=>{
    console.log(`App is running on port ${port}...`)
})