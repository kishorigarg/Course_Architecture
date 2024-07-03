import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import  connectToMongoDB  from './connect.js'
import { restrictToLoggedinUserOnly,checkAuth} from './middlewares/auth.js';
import urlRoute from './routes/url.js'
//import {checkAuth} from './middlewares/auth.js'
//import { restrictToLoggedinUserOnly, checkAuth } from './middlewares/auth.js'
import URL from './models/url.js'
import staticRoute from './routes/staticRouter.js'
import userRoute from './routes/user.js'

//const cookieParser = require('cookie-parser');
//const { connectToMongoDB } = require("./connect");
//const { restrictToLoggedinUserOnly, checkAuth } = require("./middlewares/auth");
//const URL = require("./models/url");

//const urlRoute = require("./routes/url");
//const staticRoute = require("./routes/staticRouter");
//const userRoute = require("./routes/user");

const app = express();
const PORT = 3000;

app.get('/login', restrictToLoggedinUserOnly, (req, res) => {
  // Route handler for /profile
  res.send('2 course and architecture for CI 1');
});

connectToMongoDB(process.env.MONGODB ?? "mongodb://localhost:27017/csit").then(() =>
  console.log("Mongodb connected")
);

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/url", restrictToLoggedinUserOnly, urlRoute);
app.use("/user", userRoute);
app.use("/", checkAuth, staticRoute);

app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectURL);
});

app.listen(PORT, () => console.log(`Server started at http://localhost:${PORT}`));

