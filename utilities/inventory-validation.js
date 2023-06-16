//copied from account-validation.js
const { body } = require("express-validator")
const validate = {}


// validate.checkClassificationData
validate.checkClassificationData = () => {
    return [
      // Vehicle name
      body("classification_name")
        .trim()
        .isLength({ min: 1 })
        .withMessage("Please provide a vehicle name."), // on error this message is sent.
    ]}
  
// validate.checkInventoryData
validate.checkInventoryData = () => {
    return [
        // vehicle classification name
        body("classification_id")
            .trim()
            .isLength({ min: 1 })
            .withMessage("Please provide a classification."), // on error this message is sent.
    
        // vehicle make
        body("inv_make")
            .trim()
            .isLength({ min: 3 })
            .withMessage("Please provide a vehicle make name."), // on error this message is sent.
    
        // vehicle model
        body("inv_model")
        .trim()
        .isLength({ min: 3 })
        .withMessage("Please provide a vehicle model name."),
        
        // vehicle description
        body("inv_description")
            .trim()
            .withMessage("Please describe the vehicle."),

        // vehicle price
        body("inv_price")
        .trim()
        .withMessage("Please provide a price tag for the vehicle."),

        // vehicle year
        body("inv_year")
        .trim()
        .isLength({ min: 4 })
        .withMessage("Please provide a year for when the vehicle was made."),

        // vehicle miles
        body("inv_miles")
        .trim()
        .withMessage("Please provide the number of miles the vehicle has."),

        // vehicle color
        body("inv_color")
        .trim()
        .withMessage("Please provide the main color of the vehicle."),
    ]
  }

  // validate.checkUpdateData
validate.checkUpdateData = () => {
    return [
        //
        body("inv_id")
            .trim()
            .withMessage("Please provide the inventory id."),

        // vehicle classification name
        body("classification_id")
            .trim()
            .isLength({ min: 1 })
            .withMessage("Please provide a classification."), // on error this message is sent.
    
        // vehicle make
        body("inv_make")
            .trim()
            .isLength({ min: 3 })
            .withMessage("Please provide a vehicle make name."), // on error this message is sent.
    
        // vehicle model
        body("inv_model")
        .trim()
        .isLength({ min: 3 })
        .withMessage("Please provide a vehicle model name."),
        
        // vehicle description
        body("inv_description")
            .trim()
            .withMessage("Please describe the vehicle."),

        // vehicle price
        body("inv_price")
        .trim()
        .withMessage("Please provide a price tag for the vehicle."),

        // vehicle year
        body("inv_year")
        .trim()
        .isLength({ min: 4 })
        .withMessage("Please provide a year for when the vehicle was made."),

        // vehicle miles
        body("inv_miles")
        .trim()
        .withMessage("Please provide the number of miles the vehicle has."),

        // vehicle color
        body("inv_color")
        .trim()
        .withMessage("Please provide the main color of the vehicle."),
    ]
  }
  
module.exports = validate