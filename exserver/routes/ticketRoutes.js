const express = require('express');
const authController = require('../controllers/authController');
const {
  getAllTickets,
  createTicket,
  getTicket,
  updateTicket,
  deleteTicket,
  reviewTicket
} = require('./../controllers/ticketController');

//routers
const router = express.Router();

router
  .route('/')
  .get(authController.protect, getAllTickets)
  .post(authController.protect, createTicket);
router
  .route('/:id')
  .get(getTicket)
  .patch(authController.protect, 
    authController.restrictTo('staff'),
    updateTicket)
  .delete(
    authController.protect,
    // authController.restrictTo("admin"),
    deleteTicket
  );
router
  .route('/review/:id')
  .patch(
    authController.protect,
    authController.restrictTo('supervisor', 'leader'),
    reviewTicket
  );

module.exports = router;
