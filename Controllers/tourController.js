/* eslint-disable prettier/prettier */

const Tour = require('../models/tourModel')


//Route Handlers
//get request to get all the tours
exports.getAllTours = async (req, res) => {
  
 try{
   //build query
   //new copy of query object
   const queryObj = {...req.query}
  //fields to exclude before query
  const excluededFields = ['page','limit','sort','fields']

  excluededFields.forEach(el => delete queryObj[el])

   const query = Tour.find(queryObj)

   //execute query
   const tours = await query

    res.status(200).json({
    status: 'success',
    result: tours.length,
    data: {
      tours,
    },
  });
 }catch(err){
   res.status(404).json({
     status: 'fail',
     message: 'Invalid Request!'
   })
 }
};

//get request to get a particular tour using id as param
exports.getTour = async (req, res) => {
 
  try{
    const tour = await Tour.findById(req.params.id)

    res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
    });
  }catch(err){
    res.status(404).json({
        status: 'fail',
        message: 'Invalid Request!'
      })
  }
  
};



//post request to create a new tour
exports.createTour = async (req, res) => {

  try{
    const newTour = await Tour.create(req.body)

    res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
  } catch(err){
    res.status(400).json({
      status: 'fail',
      message: 'Invalid data sent!'
    })
  }

  
};

//Patch request to update a tour
exports.updateTour = async (req, res) => {
  try{
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body,{
      new: true, //this will added the updated element
      runValidators: true, // this will check the schema rules
    })
    res.status(200).json({
    status: 'success',
    data: {
      tour
    },
  });

  }catch(err){

    res.status(404).json({
        status: 'fail',
        message: 'Invalid Request!'
      })
  }
  
};

// delete a tour
exports.deleteTour = async (req, res) => {
  try{
    await Tour.findByIdAndDelete(req.params.id)

  res.status(204).json({
    status: 'success',
    data: null,
  });
  }catch(err){

    res.status(404).json({
        status: 'fail',
        message: 'Invalid Request!'
      })
  }
  
};
