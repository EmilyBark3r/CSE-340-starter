/* ****************************************
*  Account Routes
*  Unit 4 activity
* *************************************** */
// Needed Resources
const express = require("express")
const router = new express.Router()
const accountController = require("../controllers/accountController")
const utilities = require("../utilities")
// unit 4 server-side data validation activity
const regValidate = require('../utilities/account-validation')


/* ****************************************
*  Deliver login view unit 4 activity
* *************************************** */
router.get("/login", utilities.handleErrors(accountController.buildLogin))
// register post
router.post('/register', utilities.handleErrors(accountController.registerAccount))

// Process the registration data
router.post(
    "/register",
    regValidate.registationRules(),
    regValidate.checkRegData,
    utilities.handleErrors(accountController.registerAccount)
  )

// Process the login attempt
router.post(
  "/login",
  (req, res) => {
    res.status(200).send('login process')
    regValidate.registationRules(),
    regValidate.checkRegData,
    utilities.handleErrors(accountController.buildLogin)
  }
)

module.exports = router