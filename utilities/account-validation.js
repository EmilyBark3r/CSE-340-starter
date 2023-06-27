const accountModel = require("../models/account-model")
//unit 4 activity server-side data validation
const utilities = require(".")
const { body, validationResult } = require("express-validator")
const validate = {}

/*  **********************************
 *  Registration Data Validation Rules
 * ********************************* */
validate.registationRules = () => {
  return [
    // firstname is required and must be string
    body("account_firstname")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Please provide a first name."), // on error this message is sent.

    // lastname is required and must be string
    body("account_lastname")
      .trim()
      .isLength({ min: 2 })
      .withMessage("Please provide a last name."), // on error this message is sent.

    // valid email is required and cannot already exist in the database
    // valid email is required
    // if email is being changed, it cannot already exist in the database
    body("account_email")
    .trim()
    .isEmail()
    .normalizeEmail() // refer to validator.js docs
    .withMessage("A valid email is required.")
    .custom(async (account_email) => {
    const account_id = body.account_id
    const account = accountModel.getAccountById(account_id)
    // Check if submitted email is same as existing
    if (account_email != account.account_email) {
    // No - Check if email exists in table
    const emailExists = await accountModel.checkExistingEmail(account_email)
    // Yes - throw error
    if (!emailExists.count) {
    throw new Error("Email exists. Please use a different email")
    }
    }
    }),
    
    // password is required and must be strong password
    body("account_password")
      .trim()
      .isStrongPassword({
        minLength: 12,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
      .withMessage("Password does not meet requirements."),
  ]
}

/*  **********************************
 *  Check Login Rules
 * ********************************* */
validate.loginRules = () => {
  return [
    body("account_email")
    .trim()
    .isEmail()
    .normalizeEmail() // refer to validator.js docs
    .withMessage("A valid email is required.")
    .custom(async (account_email) => {
    const account_id = body.account_id
    const account = accountModel.getAccountById(account_id)
    // Check if submitted email is same as existing
    if (account_email != account.account_email) {
    // No - Check if email exists in table
    const emailExists = await accountModel.checkExistingEmail(account_email)
    // Yes - throw error
    if (!emailExists.count) {
    throw new Error("Email exists. Please use a different email")
    }
    }
    }),
    
    // password is required and must be strong password
    body("account_password")
      .trim()
      .isStrongPassword({
        minLength: 12,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
      .withMessage("Password does not meet requirements."),
  ]
}


  /* ******************************
 * Check data and return errors or continue to registration
 * ***************************** */
validate.checkRegData = async (req, res, next) => {
    const { 
      account_firstname, 
      account_lastname, 
      account_email,
     } = req.body
     
    let errors = []
    errors = validationResult(req)
    if (!errors.isEmpty()) {
      let nav = await utilities.getNav()
      res.render("/account/register", {
        errors,
        title: "Registration",
        nav,
        account_firstname,
        account_lastname,
        account_email,
      })
      return
    }
    next()
  }
  
  module.exports = validate