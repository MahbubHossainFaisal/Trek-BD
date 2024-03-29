/* eslint-disable prettier/prettier */

const Tour = require('../models/tourModel')

const APIFeatures = require('../utils/apiFeatures')

exports.aliasTopTour = (req,res,next) =>{
  //predefining limit,sorting according to properties for tours/top-5-cheap-tour route
  req.query.limit = '5'
  req.query.sort = '-ratingsAverage,price'
  req.query.fields = 'name,difficulty,summary,ratingsAverage,price'
  next();
}


//Route Handlers
//get request to get all the tours
exports.getAllTours = async (req, res) => {
  
 try{
   
   //execute query
   const features = new APIFeatures(Tour.find(),req.query)
   features
   .filter()
   .sort()
   .limitFields()
   .paginate()
   const tours = await features.query

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
     message: err
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
    console.log(err)
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

exports.getTourStats = async (req,res) =>{
  try{
    const stats = await Tour.aggregate([
      { $match : { ratingsAverage: { $gte : 4.5 }}},
      {
        $group : {
          _id: '$difficulty',
          numTours: { $sum: 1},
          numRatings: { $sum: '$ratingsQuantity'},
          avgRating: { $avg: '$ratingsAverage'},
          avgPrice: { $avg: '$price'},
          minPrice: { $min: '$price'},
          maxPrice: { $max: '$price'}
        }
      },
      {
        $sort: { avgPrice: 1}
      }
    ])

    res.status(201).json({
    status: 'success',
    data: stats
  });

  }catch(err){
    res.status(404).json({
        status: 'fail',
        message: 'Invalid Request!'
      })
  }
}


exports.getMonthlyPlan = async (req,res) =>{
 try{
    const year = req.params.year * 1

  const plan = await Tour.aggregate([
    { //bring out array elements one by one of startDates and create new documents with each element
      $unwind: '$startDates'
    },
    {
      //query tours
      $match: {
        
        startDates:{
          //query condition
          $gte : new Date(`${year}-01-01`),
          $lte : new Date(`${year}-12-31`)
        }
      }
    },
    {
      $group: {
        _id: {$month: '$startDates'}, // group by month
        numTourStarts: {$sum: 1}, //total num of tours in same month
        tours: {$push: '$name'} // array of the name of the tours start in the same month
      }
    },
    {
      $addFields: {month: '$_id'} // make month field which will store _id value
    },
    {
      $project: {
        _id: 0 // means id won't show in document it will be hidden
      }
    },
    {
      $sort: { numTourStarts: -1} // tour documents will be sorted in decreasing order according to tour number in a month
    },
    {
      $limit: 12 // means we can limit the number of documents that we want to show
    }
  ])

  res.status(201).json({
    status: 'success',
    data: plan
  })

 }catch(err){
  res.status(404).json({
        status: 'fail',
        message: 'Invalid Request!'
      })
  }
 }
