const cors = require('cors');
const express = require('express');

const morgan = require('morgan');
const app = express();
const userRouter = require('./routes/userRoutes');
const ticketRouter = require('./routes/ticketRoutes');
const logRouter = require('./routes/logRouters');

app.use(cors());
//middle ware
if(process.env.NODE_ENV === 'development'){
  app.use(morgan('dev'));
}
app.use(express.json());
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});



//routes handler
app.get('/', (req, res) => {
  res
    .status(200)
    .json({ message: 'Welcome to Ticket System', app: 'node-express' });
});

//ROUTE
app.use('/api/v1/users', userRouter);
app.use('/api/v1/tickets', ticketRouter);
app.use('/api/v1/logs', logRouter);

module.exports = app;
