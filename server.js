const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const { xss } = require("express-xss-sanitizer");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const cors = require("cors");

//Load env vars
dotenv.config({ path: "./config/config.env" });

//Connect to database
connectDB();

const app = express();

//add body parser
app.use(express.json());
//Sanitize data
app.use(mongoSanitize());
//Set security headers
app.use(helmet());
//Prevent XSS attacks
app.use(xss());

//Rate Limiting
const limiter = rateLimit({
  windowsMs: 10 * 60 * 1000, //10 mins
  max: 100,
});
app.use(limiter);

//Prevent http param pollutions
app.use(hpp());

//Enable CORS
app.use(cors());

//Cookie parser
app.use(cookieParser());

//Route files
const events = require("./routes/events");
const auth = require("./routes/auth");
const companies = require("./routes/companies");
const bookings = require("./routes/bookings");
const eventsCompanies = require("./routes/eventsCompanies");
const bookingDetailsRoutes = require("./routes/bookingsEventsCompanies");
const adminCompanyRoutes = require("./routes/adminCompany");

app.use("/api/v1/events", events);
app.use("/api/v1/auth", auth);
app.use("/api/v1/companies", companies);
app.use("/api/v1/bookings", bookings);
app.use("/api/v1/events", eventsCompanies);
app.use("/api/v1/bookingDetails", bookingDetailsRoutes);
app.use("/api/v1/admin", adminCompanyRoutes);

const PORT = process.env.PORT || 5000;
const server = app.listen(
  PORT,
  console.log("Server running in ", process.env.NODE_ENV, "mode on port", PORT)
);

//Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error : ${err.message}`);
  //close server & Exit proccess
  server.close(() => process.exit(1));
});
