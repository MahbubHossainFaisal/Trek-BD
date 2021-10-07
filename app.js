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

//get request to get a particular tour using id as param
app.get('/api/v1/tours/:id', (req,res) =>{
    //converting string to number with * 1
    const id = req.params.id * 1
    const tour = tours.find(tour => tour.id === id)

    if(!tour){
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        })
    }
    res.status(200).json({
        status: 'success',
        data: {
            tour
        }
    })
})
//post request to create a new tour
app.post('/api/v1/tours', (req,res)=>{
   const newID = tours[tours.length-1].id + 1;
   //making a new object
   const newTour = Object.assign({id: newID}, req.body)
   //adding it with older array tours
   tours.push(newTour)

   fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err =>{
       //reponse for post request
       res.status(201).json({
           status: 'success',
           data:{
               tour: newTour
           }
       })
   })
})

//PATCH request 
app.patch('/api/v1/tours/:id', (req,res) =>{
    if(req.params.id * 1 > tours.length){
       return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        })
    }

    // actually this is just a demo of patch req , not updating anything
    res.status(200).json({
        status: 'success',
        data: {
            tour: 'Updated properties'
        }
    })
})

//DELETE request
app.delete('/api/v1/tours/:id', (req,res) =>{
    if(req.params.id * 1 > tours.length){
       return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        })
    }

    // actually this is just a demo of delete req , not deleting anything
    res.status(204).json({
        status: 'success',
        data: null
    })
})


const port = 5000;
app.listen(port, ()=>{
    console.log(`App is running on port ${port}...`)
})