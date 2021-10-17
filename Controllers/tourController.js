/* eslint-disable prettier/prettier */

const Tour = require('../models/tourModel')


//Route Handlers
//get request to get all the tours
exports.getAllTours = (req, res) => {
  res.status(200).json({
    // status: 'success',
    // result: tours.length,
    // data: {
    //   tours,
    // },
  });
};

//get request to get a particular tour using id as param
exports.getTour = (req, res) => {
  //    converting string to number with * 1
  const id = req.params.id * 1;
  // const tour = tours.find((tr) => tr.id === id);

  // if (!tour) {
  //   return res.status(404).json({
  //     status: 'fail',
  //     message: 'Invalid ID',
  //   });
  // }
  // res.status(200).json({
  //   status: 'success',
  //   data: {
  //     tour,
  //   },
  // });
};

//check request body of tour before creating a new tour
exports.checkTourBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(404).json({
      status: 'fail',
      message: 'Missing name or price property!',
    });
  }
  next();
};

//post request to create a new tour
exports.createTour = (req, res) => {

  res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
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
