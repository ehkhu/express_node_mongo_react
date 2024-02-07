const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
const app = express();
const userRouter = require('./routes/userRoutes');
const ticketRouter = require('./routes/ticketRoutes');
const logRouter = require('./routes/logRouters');
const User = require('./models/userModel');

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const logger = require("./utils/logger");
const fs = require('fs');

app.use(cors());
//middle ware
if(process.env.NODE_ENV === 'development'){
  app.use(morgan('dev'));
}
app.use(express.json());

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



dotenv.config({
  path: "./config.env",
});

//CONNECT MONGODB
if(process.env.NODE_ENV === 'production'){
  const PROD_DB = 'mongodb://mongo_db_service:27019/ticketing-system'
  mongoose.connect(PROD_DB).then(() => {
  console.log("DB connection successful.");
});
}else{
  const DB = process.env.DATABASE_LOCAL;  
  mongoose.connect(DB).then(() => {
  console.log("DB connection successful.");
});
}

//START SERVER

const port = process.env.PORT || 8000;
app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
  console.log(`App is running on port ${port}`);
});



// Function to check if the User model is empty
const isUserModelEmpty = async () => {
  try {
    const count = await User.countDocuments();
    return count === 0;
  } catch (error) {
    console.error('Error checking User model:', error);
    return false;
  }
};

// Function to import data
const importData = async () => {
  const users = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/ticketing-system.users.json`, 'utf-8'));
  try {
    await User.create(users);
    console.log('Data Successfully Loaded!');
  } catch (error) {
    console.error('Error importing data:', error);
  }
};

// Check if User model is empty and import data if it is
const initializeData = async () => {
  if (await isUserModelEmpty()) {
    await importData();
  } else {
    console.log('User model is not empty. Skipping data import.');
  }
};

initializeData(); 

module.exports = app;
