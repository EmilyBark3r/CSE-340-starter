// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const utilities = require("../utilities")


// Route to build management view
router.get("/", utilities.handleErrors(invController.buildMangementView))
// Route to build error view 
router.get("/broken", utilities.handleErrors(invController.error))
// Route to build classification view
router.get("/add-classification", utilities.handleErrors(invController.buildClassificationView))
// Route to build inventory view
router.get("/add-inventory", utilities.handleErrors(invController.buildInventoryView))

// management view post
router.post(
    "/inv",
    (req, res) => {
      regValidate.registationRules(),
      regValidate.checkRegData
    })
//add classification
router.post(
  "/add-classification",
  (req, res) => {
  regValidate.registationRules(),
  regValidate.checkRegData,
  utilities.handleErrors(invController.buildClassificationView)
  })
//add inventory
router.post(
  "/add-inventory",
  (req, res) => {
  regValidate.registationRules(),
  regValidate.checkRegData,
  utilities.handleErrors(invController.buildInventoryView)
  })

// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);
// Route to build inventory by inventory view
router.get("/detail/:invId", invController.buildByInventoryId);

module.exports = router;