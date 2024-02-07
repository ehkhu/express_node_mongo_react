const mongoose = require('mongoose') 


  const ticketSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      enum: ['submitted', 'supervisor_review', 'leader_review', 'processing', 'completed'],
      default: 'submitted',
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    createdAt: Date,
    updatedAt: Date,
    comments: [{
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      message: String,
      timestamp: {
        type: Date,
        default: Date.now,
      },
    }],
  }, { timestamps: true });


  
const Tour = mongoose.model('Ticket',ticketSchema);

module.exports = Tour;