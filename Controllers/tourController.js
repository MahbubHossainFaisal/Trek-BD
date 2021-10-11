const fs = require('fs')

const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`))



//param middleware function
 exports.checkID = (req,res,next,val) =>{
    console.log(`Tour id: ${val}`)
    if(req.params.id * 1 > tours.length){
       return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        })
    }
    next()
}

//Route Handlers
//get request to get all the tours
exports.getAllTours = (req,res) =>{
    
    res.status(200).json({
        status: 'success',
        result: tours.length,
        data: {
            tours
        }
    })
}

//get request to get a particular tour using id as param
exports.getTour = (req,res) =>{
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
exports.createTour = (req,res)=>{
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
exports.updateTour = (req,res) =>{
    
    // actually this is just a demo of patch req , not updating anything
    res.status(200).json({
        status: 'success',
        data: {
            tour: 'Updated properties'
        }
    })
}

// delete a tour
exports.deleteTour = (req,res) =>{
    

    // actually this is just a demo of delete req , not deleting anything
    res.status(204).json({
        status: 'success',
        data: null
    })
}
