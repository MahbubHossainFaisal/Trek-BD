const express = require('express');

const {
  checkID,
  getAllTours,
  checkTourBody,
  createTour,
  getTour,
  updateTour,
  deleteTour,
} = require('../Controllers/tourController');
//  Routes for tours
const router = express.Router();
//  param middleware
router.param('id', checkID);
router.route('/').get(getAllTours).post(checkTourBody, createTour);
router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);
module.exports = router;
