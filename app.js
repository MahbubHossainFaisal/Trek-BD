const express = require('express')
const fs = require('fs')

const app = express()

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`))

//middleware to make a body property of req object while post request
app.use(express.json())

//get request to get all the tours
app.get('/api/v1/tours', (req,res) =>{
    res.status(200).json({
        status: 'success',
        result: tours.length,
        data: {
            tours
        }
    })
})

//post request to create a new tour
app.post('/api/v1/tours', (req,res)=>{
   const newID = tours[tours.length-1].id + 1;
   const newTour = Object.assign({id: newID}, req.body)
   tours.push(newTour)

   fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err =>{
       res.status(201).json({
           status: 'success',
           data:{
               tour: newTour
           }
       })
   })
})

const port = 5000;
app.listen(port, ()=>{
    console.log(`App is running on port ${port}...`)
})