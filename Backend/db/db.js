const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const URL=process.env.DB_CONNECT
function connectToDb(){
    mongoose.connect(URL).then(()=> console.log('connect to db'))
    .catch(err=>console.log(err));
};

module.exports = connectToDb; //there is an issue in my code please fix it