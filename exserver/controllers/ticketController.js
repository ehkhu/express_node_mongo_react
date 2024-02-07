const Ticket = require('../models/ticketModel');
const logger = require('./../utils/logger');
const User = require('../models/userModel');
exports.getAllTickets = async (req, res) => {
  try {
    console.log(req.query);
    const tickets = await Ticket.find()
      .populate('createdBy', 'name')
      .populate('assignedTo', 'name');

    res.status(200).json({
      status: 'success',
      resluts: tickets.length,
      data: {
        tickets,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error,
    });
  }
};

exports.getTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id)
      .populate('createdBy', 'name')
      .populate('assignedTo', 'name')
      .populate({
        path: 'comments',
        populate: {
          path: 'user',
          select: 'name',
        },
      });
    res.status(200).json({
      status: 'success',
      data: {
        ticket,
      },
    });
  } catch (error) {
    return res.status(400).json({ status: 'fail', message: error });
  }
};
exports.createTicket = async (req, res) => {
  const { id: userId } = req.user;
  const { id: supervisorId } = await User.findOne({ role: 'supervisor' });
  try {
    const { title, description } = req.body;
    const newTicket = await Ticket.create({
      title,
      description,
      createdBy: userId,
    }).then((ticket) => {
      // Assign to supervisor
      ticket.status = 'supervisor_review';
      ticket.assignedTo = supervisorId; // Assign to supervisor
      ticket.comments.push({ user: userId, message: 'Submitted for review.' });
      return ticket.save();
    });
    
    logger.info(`Ticket Create by ${userId}`);
    logger.info(`Ticket Created :  ${newTicket.id}`);
    logger.info(`Ticket Assign to supervisor : ${supervisorId}`);

    res.status(201).json({
      status: 'success',
      data: {
        ticket: newTicket,
      },
    });
  } catch (err) {
    logger.error(`Fail Ticket Create by ${userId}`);
    res.status(400).json({ status: 'fail', message: err });
  }
};

exports.updateTicket = async (req, res) => {
  //update
  const { id: userId } = req.user;
  const { title, description } = req.body;
  const newTicket = {
    title,
    description,
  };
  try {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    if (
      ticket.createdBy.toString() !== req.user.id ||
      ticket.status !== 'submitted'
    ) {
      return res.status(403).json({
        message: 'Forbidden: You are not allowed to update this ticket',
      });
    }

    const { id: supervisorId } = await User.findOne({ role: 'supervisor' });
    ticket.title = title;
    ticket.description = description;
    await ticket.save().then((ticket) => {
      // Assign to supervisor
      ticket.status = 'supervisor_review';
      ticket.assignedTo = supervisorId; // Assign to supervisor
      ticket.comments.push({ user: userId, message: 'Submitted for review.' });
      return ticket.save();
    });

    logger.info(`Ticket update : ${userId}`);
    logger.info(`Ticket updated successfully: ${ticket.id}`);
    res.status(200).json({
      status: 'success',
      data: {
        ticket,
      },
    });
  } catch (error) {
    logger.error(`Fail Ticket Update by ${userId}`);
    logger.error(`Error ${error}`);
    res.status(400).json({ status: 'fail', message: error });
  }
};

exports.deleteTicket = async (req, res) => {
  //delete
  console.log('delete ticket');
  try {
    await Ticket.findByIdAndDelete(req.params.id);
    logger.info(`Ticket a detele : ${req.params.id}`);
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    logger.error(`Fail Ticket Delete : ${error}`);
    res.status(400).json({ status: 'fail', message: error });
  }
};

exports.reviewTicket = async (req, res) => {
  try {
    const { needsMoreInfo, message } = req.body; // needMoreInformation [true,false], message

    const ticket = await Ticket.findById(req.params.id);
    const { id: userId, role } = req.user; //reviewer [supervisor,leader]

    if (!ticket) {
      logger.error(`NotFound: this ticket ${req.params.id}`);
      return res.status(404).json({ message: 'Ticket not found' });
    }

    if (ticket.status !== role + '_review') {
      logger.error(`Forbidden: You are not allowed to update this ticket`);
      return res.status(403).json({
        message: 'Forbidden: You are not allowed to update this ticket',
      });
    }
    console.log(role + '_review');
    if (needsMoreInfo) {
      //back to submitted
      if (role === 'supervisor') {
        ticket.status = 'submitted';
        ticket.assignedTo = ticket.createdBy; // Assign to supervisor
        ticket.comments.push({
          user: userId,
          message: message ? message : 'Need to provide more information',
        });
        const newTicket = await ticket.save();
        logger.info(`Ticket review : ${userId}`);
        logger.info(`Ticket review successfully : ${ticket.id}`);
        res.status(200).json({
          status: 'success',
          data: {
            newTicket,
          },
        });
      }
      if (role === 'leader') {
        //back to supervisor
        //commend for need more information
        const { id: supervisorId } = await User.findOne({ role: 'supervisor' });
        ticket.status = 'supervisor_review';
        ticket.assignedTo = supervisorId; // Assign to supervisor
        ticket.comments.push({
          user: userId,
          message: message ? message : 'Need to provide more information',
        });
        const newTicket = await ticket.save();
        logger.info(`Ticket review : ${userId}`);
        logger.info(`Ticket review successfully : ${ticket.id}`);
        res.status(200).json({
          status: 'success',
          data: {
            newTicket,
          },
        });
      }
    } else {
      if (role === 'supervisor') {
        //submit to leader
        //commend for need more information
        const { id: leaderId } = await User.findOne({ role: 'leader' });
        ticket.status = 'leader_review';
        ticket.assignedTo = leaderId; // Assign to supervisor
        ticket.comments.push({ user: userId, message: 'Submit to review' });
        const newTicket = await ticket.save();
        logger.info(`Ticket review : ${userId}`);
        logger.info(`Ticket review successfully : ${ticket.id}`);
        res.status(200).json({
          status: 'success',
          data: {
            newTicket,
          },
        });
      }
      if (role === 'leader') {
        ticket.status = 'processing';
        const newTicket = await ticket.save();
        logger.info(`Ticket review : ${userId}`);
        logger.info(`Ticket review successfully : ${ticket.id}`);
        res.status(200).json({
          status: 'success',
          data: {
            newTicket,
          },
        });
      }
    }

    // const ticket = await Ticket.findByIdAndUpdate(req.params.id, newTicket, {
    //   new: true,
    // });
  } catch (error) {
    logger.error(`Error ${error}`);
    res.status(400).json({ status: 'fail', message: error });
  }
};
