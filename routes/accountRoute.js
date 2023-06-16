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
// register get
router.get('/register', utilities.handleErrors(accountController.buildRegister))
// account-mangaement get
router.get('/account-management', utilities.handleErrors(accountController.buildAccountManagement))

// Process the registration data
router.post(
    "/register",
    regValidate.registationRules(),
    regValidate.checkRegData,
    regValidate.registerAccount,
    utilities.handleErrors(accountController.buildRegister)
  )

// Process the login attempt
router.post(
  "/login",
    regValidate.checkLogin(),
    regValidate.checkRegData,
    regValidate.accountLogin,
    utilities.handleErrors(accountController.buildLogin)
)

// Process the account-management
router.post(
  "/account-management",
  regValidate.checkRegData,
  utilities.handleErrors(accountController.buildAccountManagement)
)

module.exports = router