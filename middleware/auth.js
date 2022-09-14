require("dotenv").config();

function auth(req, res, next) {
  const token = req.header("password");
  if (token === process.env.REACT_APP_PASSWORD) {
    next();
  } else {
    res.status(401).send("Unauthorized Request!!");
  }
}
module.exports = auth;
