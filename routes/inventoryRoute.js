// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const utilities = require("../utilities")

// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);
// Route to build inventory by inventory view
router.get("/detail/:invId", invController.buildByInventoryId);
// Route to build error view 
router.get("/broken", utilities.handleErrors(invController.error))

module.exports = router;