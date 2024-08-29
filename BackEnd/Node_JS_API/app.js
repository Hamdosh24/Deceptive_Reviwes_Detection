// spinning express application for handling requests
const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyPareser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require('cookie-parser');


app.use(cors());
app.use(express.json());
app.use(cookieParser());


const predictionRoutes = require("./api/routes/prediction");
const userRoutes = require("./api/routes/users");
const scraperRoutes = require("./api/routes/scrap");
const scraperPredictRoutes = require("./api/routes/scrapPredict");
const usageLogRoute = require("./api/routes/usageLog");
const adminusageLogRoute = require("./api/routes/adminusageLog");
const feedbackRoutes = require("./api/routes/feedback"); // تأكد من المسار صحيح

app.use("/scraper", scraperRoutes);

const mongoURI = "mongodb://localhost:27017/";

mongoose.connect(mongoURI);

app.use(morgan("dev")); //حتى تصولني الشغلات يلي عم اعملا يكوست

app.use(bodyPareser.urlencoded({ extended: false }));
app.use(bodyPareser.json()); //تجعل قرائة داتا الجسون سهلة
app.use((req, res, next) => {
  res.header("Acccess-Control-Allow-Origin", "*");
  res.header("Acccess-Control-Allow-Headers", "*");
  [];
  if (req.method === "OPTIONS") {
    res.header(
      "Acccess-Control-Allow-Methods",
      "GET, POST, PUT, PATCH, DELETE"
    );
    return res.status(200).json({});
  }
  next(); //حتى لا اعمل بلوك للركوست تبعي
});

app.use("/predict", predictionRoutes);
app.use("/users", userRoutes);
app.use("/scrap", scraperRoutes);
app.use("/scrapPredict", scraperPredictRoutes);
app.use("/feedback", feedbackRoutes);
app.use("/usageLog", usageLogRoute);
app.use("/adminusageLog", adminusageLogRoute);

app.use((req, res, next) => {
  const error = new Error("Not found"); //في حال ما لقى بيلي فوق بنزل لهون
  error.status = 404;
  next(error);
});
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});
module.exports = app;
