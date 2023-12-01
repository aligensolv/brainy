const dotenv = require('dotenv')
dotenv.config()

const express = require("express");
const app = express();
const port = 4000 || process.env.PORT;
const cors = require("cors");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");
// const uri = 'mongodb+srv://danaaka8:p6TPp7ILrQUlDKfE@cluster0.uyhqfof.mongodb.net/alaa'; // Replace with your MongoDB connection URI
const uri = 'mongodb://127.0.0.1:27017/alaa'; // Replace with your MongoDB connection URI
//const uri = 'mongodb+srv://danaaka8:p6TPp7ILrQUlDKfE@cluster0.uyhqfof.mongodb.net/alaa'; // Replace with your MongoDB connection URI

const path = require('path');

mongoose.connect(uri).then(() => console.log('connected mongoose'))

app.use(cors({
  origin: '*'
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/public',express.static(path.join(__dirname, 'public')))

const userRoute = require('./routers/userRoute')
const managerRoute = require('./routers/manager_route')
const storyRoute = require('./routers/story_router')
const videoRoute = require('./routers/video_router')
const chatRoute = require('./routers/chat_route')
const quizRoute = require('./routers/quiz_route')

const categoryRoute = require('./routers/category_router')
const ageRoute = require('./routers/age_router')

app.use(
  '/api', 
  userRoute,
  managerRoute,
  storyRoute,
  videoRoute,
  chatRoute,
  quizRoute,
  categoryRoute,
  ageRoute
);

app.listen(port, () => {
  console.log("port running on " + port);
});
