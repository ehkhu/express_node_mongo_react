const fs = require('fs');
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const Ticket = require('./../models/ticketModel')
const User = require('./../models/userModel')
const bcrypt = require('bcryptjs');

dotenv.config({
  path:'./config.env'
})

//CONNECT MONGODB
const DB = process.env.DATABASE_LOCAL;
mongoose.connect(DB).then(()=>{
  console.log('DB connection successful.');
});
const users = JSON.parse( fs.readFileSync(`${__dirname}/ticketing-system.users.json`,'utf-8'));

const importData = async ()=>{
    try {
        await User.create(users);
        console.log('Data Successfuly Loaded!');
        process.exit();
    } catch (error) {
        console.log(error);
        process.exit();
    }
}

//Delete all data from db
const deleteData = async ()=>{
    try {
        await Ticket.deleteMany()
        await User.deleteMany()
        console.log("delete successful");
        process.exit();
    } catch (error) {
        console.log(err);
        process.exit();
    }
}

//CALL FROM CMD ' node dev-data/data/import-dev-data.js --delete '
// node dev-data/data/import-dev-data.js --delete 
if(process.argv[2] === '--import'){
    importData();
}else if(process.argv[2] === '--delete'){
    deleteData();
}

console.log(process.argv);