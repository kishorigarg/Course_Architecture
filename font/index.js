import http from 'http';
import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import bodyParser from 'body-parser';
import userSchema from './models/user.js';

const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/csit")
  .then(() => console.log("mongodb connected"))
  .catch(err => console.log("mongo error", err));

const User = mongoose.model("User", userSchema);
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('login');
});
app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/signup', (req, res) => {
  res.render('signup');
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (user) {
      const match = await bcrypt.compare(password, user.password);
      if (match) {

        res.redirect('/home');
      } else {
        res.status(401).send('Incorrect password');
      }
    } else {
      res.redirect('/signup');
    }
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).send('Internal Server Error');
  }
});
app.get('/home', (req, res) => {
  res.render('homepage', { title: 'Home Page', user: req.user });
});
app.post("/signup", async (req, res) => {
  const { username, email, password, category } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).send('User already exists');
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: passwordHash, category });
    await newUser.save();
    res.redirect('/login');
  } catch (err) {
    console.error('Error during signup:', err);
    res.status(500).send('Internal Server Error');
  }
});


const server = http.createServer(app);
server.listen(3000, () => {
  console.log("Server started at http://localhost:3000");
});
