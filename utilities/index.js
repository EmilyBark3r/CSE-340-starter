const invModel = require("../models/inventory-model")
const Util = {}

// Unit 5 Login Activity
const jwt = require("jsonwebtoken")
require("dotenv").config()

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function (req, res, next) {
  let data = await invModel.getClassifications()
  let list = "<ul>"
  list += '<li><a href="/" title="Home page">Home</a></li>'
  data.rows.forEach((row) => {
    list += "<li>"
    list +=
      '<a href="/inv/type/' + row.classification_id +
      '" title="See our inventory of ' + row.classification_name +
      ' vehicles">' + row.classification_name + "</a>"
    list += "</li>"
  })
  list += "</ul>"
  return list
}

/* **************************************
* Build the classification view HTML 
* ************************************ */
Util.buildClassificationGrid = async function(data){
  let grid
  if(data.length > 0){
    grid = '<ul id="inv-display">'
    data.forEach(vehicle => { 
      grid += '<li>'
      grid +=  '<a href="../../inv/detail/'+ vehicle.inv_id 
      + '" title="View ' + vehicle.inv_make + ' '+ vehicle.inv_model 
      + 'details"><img src="' + vehicle.inv_thumbnail 
      +'" alt="Image of '+ vehicle.inv_make + ' ' + vehicle.inv_model 
      +' on CSE Motors" /></a>'
      grid += '<div class="namePrice">'
      grid += '<hr />'
      grid += '<h2>'
      grid += '<a href="../../inv/detail/' + vehicle.inv_id +'" title="View ' 
      + vehicle.inv_make + ' ' + vehicle.inv_model + ' details">' 
      + vehicle.inv_make + ' ' + vehicle.inv_model + '</a>'
      grid += '</h2>'
      grid += '<span>$' 
      + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>'
      grid += '</div>'
      grid += '</li>'
    })
    grid += '</ul>'
  } else { 
    grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
  }
  return grid
}

/* **************************************
* Build the Single Car View HTML
* ************************************ */
Util.buildSingleCarView = async function(data){
  let single
  if(data.length > 0){
    single = '<ul id="invDetail">'
    data.forEach(vehicle => { 
      single += '<li>'
      single +=  '<img src="' + vehicle.inv_thumbnail 
      +'" alt="Image of '+ vehicle.inv_make + ' ' + vehicle.inv_model 
      +' on CSE Motors" />'
      // DETAILS
    single += '<div class="details">'
        single += '<h2>'
        single += '<a id="mNM"' + vehicle.inv_make + ' ' + vehicle.inv_model + ' details">' 
        + vehicle.inv_make + ' ' + vehicle.inv_model + ' Details</a>'
        single += '</h2>'
      // PRICE
      single += '<div class="price">'
        single += '<p><strong> Price: </strong>$' 
          + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</p>'
      single += '</div>'
      // DESCRIPTION
      single += '<div class="description">'
        single += '<p><strong> Description: </strong> ' 
          + vehicle.inv_description + '</p>'
      single += '</div>'
      // COLOR
      single += '<div class="color">'
        single += '<p><strong> Color: </strong>' 
          + vehicle.inv_color + '</p>'
      single += '</div>'
      // MILES
      single += '<div class="miles">'
        single += '<p><strong> Miles: </strong>' 
          + new Intl.NumberFormat('en-US').format(vehicle.inv_miles) + '</p>'
      single += '</div>'
      single += '</li>'
    single += '</div>'
    })
    single += '</ul>'
  } else { 
    single += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
  }
  return single
}

// constuct classification list
Util.getClassificationOptions = async function (optionSelected) {
  let data = await invModel.getClassifications()
  let classificationSelect = "<option value=''>Choose a classification</option>"
  data.rows.forEach((row) => {
    classificationSelect += `<option value="${row.classification_id}">${row.classification_name}</option>`
  })
// console.log(classificationSelect)
  return classificationSelect
}

/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for 
 * General Error Handling
 **************************************** */
Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)

/* ****************************************
* Middleware to check token validity
* Unit 5 Login Activity
**************************************** */
Util.checkJWTToken = (req, res, next) => {
  if (req.cookies.jwt) {
   jwt.verify(
    req.cookies.jwt,
    process.env.ACCESS_TOKEN_SECRET,
    function (err, accountData) {
     if (err) {
      req.flash("Please log in")
      res.clearCookie("jwt")
      return res.redirect("/account/login")
     }
     res.locals.accountData = accountData
     res.locals.loggedin = 1
     next()
    })
  } else {
   next()
  }
 }

 Util.checkLogin = (req, res, next) => {
  if (res.locals.loggedin) {
    next()
  } else {
    req.flash("notice", "Please log in.")
    return res.redirect("/account/login")
  }}

module.exports = Util