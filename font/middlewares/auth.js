
import getUser from '../service/auth.js'


export const restrictToLoggedinUserOnly = (req, res, next) => {
  // Implementation of restrictToLoggedinUserOnly middleware
  const userUid = req.cookies?.uid;

  if (!userUid) return res.redirect("/login");
  const user =  getUser(userUid); // Make sure to await the async operation

  if (!user) return res.redirect("/login");

  req.user = user;

  next();
};

export const checkAuth = (req, res, next) => {
  // Implementation of checkAuth middleware;

  const userUid = req.cookies?.uid;

  const user =  getUser(userUid); // Make sure to await the async operation

  req.user = user;
  next();
};



//export {restrictToLoggedinUserOnly,checkAuth,};