const cors = require('cors');
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const logger = require("./utils/logger");
const User = require('./models/userModel');
const fs = require('fs');
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
const app = require("./app");
app.use(cors());
const port = process.env.PORT || 8000;
app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
  console.log(`App is running on port ${port}`);
});

