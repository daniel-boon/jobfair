const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');

//Load env vars
dotenv.config({path:'./config/config.env'});

//Connect to database
connectDB();

const app = express();

//add body parser
app.use(express.json());

//Cookie parser
app.use(cookieParser());

//Route files
const jobs = require ('./routes/jobs');
const auth = require('./routes/auth');

app.use('/api/v1/jobs',jobs)
app.use('/api/v1/auth', auth);

const PORT = process.env.PORT || 2000;
const server = app.listen(PORT,console.log('Server running in ',process.env.NODE_ENV,'mode on port',PORT));

//Handle unhandled promise rejections
process.on ('unhandledRejection',(err,promise)=>{
    console.log(`Error : ${err.message}`);
//close server & Exit proccess
    server.close(()=> process.exit(1));
});