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
   //build query
   //filtering
   //new copy of query object
  //  const queryObj = {...req.query}
  // //fields to exclude before query
  // const excluededFields = ['page','limit','sort','fields']

  // excluededFields.forEach(el => delete queryObj[el])

  // //advance filtering
  // let queryStr = JSON.stringify(queryObj)
  // //regular expression to match exact word like gt,gte,lt,lte
  // queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`)
  // console.log(JSON.parse(queryStr))


  //  let query = Tour.find(JSON.parse(queryStr))


   //sorting
  //  if(req.query.sort){
  //    const sortBy = req.query.sort.split(',').join(' ');

  //   query = query.sort(sortBy);
  //  }else{
  //    //by default sorting will be held using createdAt property
  //    query = query.sort('-createdAt');
  //  }

   //field limiting
  //  if(req.query.fields){
  //    const fields = req.query.fields.split(',').join(' ')
  //    query = query.select(fields)
  //  }else{
  //    //just removing the __v property that mongoose uses.Because we have no use of it.
  //    query = query.select('-__v')
  //  }

   //Pagination
   //page 1 , 0-1 documents, page 2 , 2-3 documents.....per page we will show 2 documents let's say
  //  const page = req.query.page * 1 || 1
  //  const limitValue = req.query.limit * 1 || 100
  //  const skipValue = (page-1) * limitValue

  //  query = query.skip(skipValue).limit(limitValue)

  //  if(req.query.page){
  //    //counting the number of documents in Tour collection
  //    const numOfTours = await Tour.countDocuments()

  //    if(skipValue >= numOfTours) throw new Error('The page does not exist')
  //  }
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
