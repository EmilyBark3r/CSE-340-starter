/* ****************************************
*  Account Routes
Unit 4 activity
* *************************************** */
// Needed Resources
const express = require("express")
const router = new express.Router()
const accountController = require("../controllers/accountController")
const utilities = require("../utilities")
const regValidate = require('../utilities/account-validation')


/* ****************************************
*  Deliver login view unit 4 activity
* *************************************** */
router.get("/login", utilities.handleErrors(accountController.buildLogin))
router.post('/register', utilities.handleErrors(accountController.registerAccount))

// Process the registration data
router.post(
    "/register",
    regValidate.registationRules(),
    regValidate.checkRegData,
    utilities.handleErrors(accountController.registerAccount)
  )

module.exports = router