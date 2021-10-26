const express = require('express');

const {
  getAllTours,
  createTour,
  getTour,
  updateTour,
  deleteTour,
  aliasTopTour,
} = require('../Controllers/tourController');
//  Routes for tours
const router = express.Router();
//  param middleware
//router.param('id', checkID);
router.route('/top-5-cheap-tour').get(aliasTopTour,getAllTours)
router.route('/').get(getAllTours).post(createTour);
router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);
module.exports = router;
