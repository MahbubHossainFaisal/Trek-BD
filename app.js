const express = require('express')
const fs = require('fs')
const morgan = require('morgan')
const app = express()

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`))

//middleware morgan

//middleware to make a body property of req object while post request
app.use(morgan('dev'))
app.use(express.json())



//Route Handlers
//get request to get all the tours
const getAllTours = (req,res) =>{
    
    res.status(200).json({
        status: 'success',
        result: tours.length,
        data: {
            tours
        }
    })
}

//get request to get a particular tour using id as param
const getTour = (req,res) =>{
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
}


//post request to create a new tour
const createTour = (req,res)=>{
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
}

//Patch request to update a tour
const updateTour = (req,res) =>{
    
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
}

// delete a tour
const deleteTour = (req,res) =>{
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
}

//Route Handlers for users

const getAllUsers = (req,res) =>{
    res.status(500).json({
        status: 'error',
        message: 'Route is not defined yet!'
    })
}
const createUser = (req,res) =>{
    res.status(500).json({
        status: 'error',
        message: 'Route is not defined yet!'
    })
}
const getUser = (req,res) =>{
    res.status(500).json({
        status: 'error',
        message: 'Route is not defined yet!'
    })
}

const updateUser = (req,res) =>{
    res.status(500).json({
        status: 'error',
        message: 'Route is not defined yet!'
    })
}

const deleteUser = (req,res) =>{
    res.status(500).json({
        status: 'error',
        message: 'Route is not defined yet!'
    })
}

//creating a middleware
app.use((req,res,next) =>{
    console.log('This is first middleware!')
    next()
})
//creating a middleware
app.use((req,res,next) =>{
    console.log('This is second middleware!')
    next()
})


//Routes for tours
app
.route('/api/v1/tours')
.get(getAllTours)
.post(createTour)

//creating a middleware
app.use((req,res,next) =>{
    console.log('This is third middleware!')
    next()
})
//creating a middleware
app.use((req,res,next) =>{
    console.log('This is fourth middleware!')
    next()
})



app
.route('/api/v1/tours/:id')
.get(getTour)
.patch(updateTour)
.delete(deleteTour)

//Routes for users

app
.route('/api/v1/users')
.get(getAllUsers)
.post(createUser)

app
.route('/api/v1/users/:id')
.get(getUser)
.patch(updateUser)
.delete(deleteUser)

//server
const port = 5000;
app.listen(port, ()=>{
    console.log(`App is running on port ${port}...`)
})