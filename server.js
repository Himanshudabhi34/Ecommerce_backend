import express from "express";
import * as dotenv from "dotenv";
import cors from 'cors';
import bodyParser from "body-parser";
import Router from './src/routes/UserRoutes.js'
import './src/config/db.config.js'
dotenv.config();


// General setup
const app = express();
const port = process.env.PORT;

console.log(port , ":port")

app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.use(bodyParser.json())

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type:application/x-www-form-urlencoded"
  );
  next();
});

// end

//set Routes
app.use('/', Router);
//end


app.listen(3000, () => console.log('Server is running on port 3000'));