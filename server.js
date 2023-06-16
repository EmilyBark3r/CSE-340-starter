/* ******************************************
 * This server.js file is the primary file of the 
 * application. It is used to control the project.
 *******************************************/
/* ***********************
 * Require Statements
 *************************/
const express = require("express")
const expressLayouts = require("express-ejs-layouts")
const env = require("dotenv").config()
const app = express()
const baseController = require("./controllers/baseController")
const utilities = require("./utilities/")
//unit 4 activity
const session = require("express-session")
const pool = require('./database/')
//unit 4 activity process registration
const bodyParser = require("body-parser")
// unit 5 Activity Login
const cookieParser = require("cookie-parser")

/* ***********************
 * Middleware (unit 4 activity)
 * ************************/
app.use(session({
  store: new (require('connect-pg-simple')(session))({
    createTableIfMissing: true,
    pool,
  }),
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  name: 'sessionId',
}))
//unit 4 activity process registration
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true })) 
  // unit 5 Activity Login
  app.use(cookieParser())
  app.use(utilities.checkJWTToken)
  
// Express Messages Middleware unit 4 activity
// app.use(require('connect-flash')())
// app.use(function(req, res, next){
//   res.locals.messages = require('express-messages')(req, res)
//   next()
// })
// Express Messages Middleware unit 4 activity
app.use(require('connect-flash')())
app.use(function(req, res, next){
  res.locals.messages = require('express-messages')(req, res)
  next()
})


/* ***********************
 * View Engines and Templates
 *************************/
app.set("view engine", "ejs")
app.use(expressLayouts)
app.set("layout", "./layouts/layout") // not at views root

/* ***********************
 * Routes
 *************************/
app.use(require("./routes/static"))
// Index route
app.get("/", utilities.handleErrors(baseController.buildHome))
// Inventory routes
app.use("/inv", require("./routes/inventoryRoute"))
// Account routes (unit 4 activity)
app.use("/account", require("./routes/accountRoute"))
// login and register routes

// Error Handling route
app.use(async (req, res, next) => {
  next({status: 404, message: 'Rouge aliens have abducted this page. Well try and get it back but it doesnt seem promising, return home for now.'})
})

/* ***********************
* Express Error Handler
*************************/
app.use(async (err, req, res, next) => {
  let nav = await utilities.getNav()
  console.error(`Error at: "${req.originalUrl}": ${err.message}`)
  if(err.status == 404){ message = err.message} 
  else {message = 'The mother ship is experiencing issues at the time. Return home before its too late while we get this looked at.'}
  res.render("errors/error", {
    title: err.status || 'Server Error',
    message,
    nav
  })
})

/* ***********************
 * Local Server Information
 * Values from .env (environment) file
 *************************/
const port = process.env.PORT
const host = process.env.HOST

/* ***********************
 * Log statement to confirm server operation
 *************************/
app.listen(port, () => {
  console.log(`app listening on ${host}:${port}`)
})

