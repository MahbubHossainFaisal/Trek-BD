/* eslint-disable prettier/prettier */

const Tour = require('../models/tourModel')


//Route Handlers
//get request to get all the tours
exports.getAllTours = async (req, res) => {
  
 try{
   const tours = await Tour.find()

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
exports.updateTour = (req, res) => {
  // actually this is just a demo of patch req , not updating anything
  res.status(200).json({
    status: 'success',
    data: {
      tour: 'Updated properties',
    },
  });
};

// delete a tour
exports.deleteTour = (req, res) => {
  // actually this is just a demo of delete req , not deleting anything
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
