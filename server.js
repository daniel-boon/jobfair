const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

//Load env vars
dotenv.config({path:'./config/config.env'});

//Connect to database
connectDB();

const app = express();

//add body parser
app.use(express.json());

const jobs = require ('./routes/jobs');
app.use('/api/v1/jobs',jobs)

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT,console.log('Server running in ',process.env.NODE_ENV,'mode on port',PORT));

//Handle unhandled promise rejections
process.on ('unhandledRejection',(err,promise)=>{
    console.log(`Error : ${err.message}`);
//close server & Exit proccess
    server.close(()=> process.exit(1));
});