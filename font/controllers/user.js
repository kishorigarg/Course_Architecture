import { v4 as uuidv4 } from 'uuid';
//import { v4, uuidv4 } from 'uuid'
import User from '../models/user.js'
import { setUser } from '../service/auth.js'
/*const { v4: uuidv4 } = require("uuid");
const User = require("../models/user");
const { setUser } = require("../service/auth");*/

export const handleUserSignup =(req, res,next)=> {
  const { name, email, password,Category } = req.body;
   User.create({
    name,
    email,
    password,
    Category,
  });
  return res.redirect("/");
}

export const handleUserLogin = (req, res, next) => {
  const { username, password } = req.body;
  const user = User.findOne({ username, password });

  if (!user)
    return res.render("login", {
      error: "Invalid Username or Password",
    });

  const sessionId = uuidv4();
  setUser(sessionId, user);
  res.cookie("uid", sessionId);
  return res.redirect("/");
}

/*module.exports = {
  handleUserSignup,
  handleUserLogin,
};*/