const fs = require('fs')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config({path: './config.env'})

const Tour = require('../../models/tourModel')




//read json file
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`,'utf-8'))


//connecting to database
const DB = process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE_PASSWORD)

mongoose.connect(DB,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(con =>{
   
    console.log('DB connection successful')
})


//import data into database
const importData = async () =>{
    try{
        await Tour.create(tours)
        console.log('data successfully loaded')
        process.exit()

    }catch(err){
        console.log(err)
    }
}


//Delete all data from DB
const deleteData = async () =>{
    try{
        await Tour.deleteMany()
        console.log('data successfully deleted')
        process.exit()

    }catch(err){
        console.log(err)
    }
}

if(process.argv[2] === '--import'){
    importData()
}
if(process.argv[2] === '--delete'){
    deleteData()
}

console.log(process.argv)