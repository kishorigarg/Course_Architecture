const { v4: uuidv4 } = require("uuid");
const User = require("../models/user");
const { setUser } = require("../service/auth");

async function handleUserSignup(req, res) {
  const { name, email, password,Category } = req.body;
  await User.create({
    name,
    email,
    password,
    Category,
  });
  return res.redirect("/");
}

async function handleUserLogin(req, res) {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });

  if (!user)
    return res.render("login", {
      error: "Invalid Username or Password",
    });

  const sessionId = uuidv4();
  setUser(sessionId, user);
  res.cookie("uid", sessionId);
  return res.redirect("/");
}

module.exports = {
  handleUserSignup,
  handleUserLogin,
};