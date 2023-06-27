// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const utilities = require("../utilities")


// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);
// Route to build inventory by inventory view
router.get("/detail/:invId", invController.buildByInventoryId);
// Route to edit-inventory
router.get("/edit/:inv_id", invController.editInventoryView);

// Route to build management view
router.get("/", utilities.handleErrors(invController.buildMangementView))
// Route to build error view 
router.get("/broken", utilities.handleErrors(invController.error))
// Route to build classification view
router.get("/add-classification", utilities.handleErrors(invController.buildClassificationView))
// Route to build inventory view
router.get("/add-inventory", utilities.handleErrors(invController.buildInventoryView))

//add classification
router.post(
  "/add-classification",
  // (req, res) => {
  // regValidate.registationRules(),
  // regValidate.checkRegData,
  utilities.handleErrors(invController.buildNewClassification)
  // }
  )
//add inventory
router.post(
  "/add-inventory",
//   (req, res) => {
//   regValidate.registationRules(),
//   regValidate.checkRegData,
  utilities.handleErrors(invController.buildInventoryView)
  // }
)

// update inventory post
router.post("/update/", invController.updateInventory)

/* *************************
* Get inventory for AJAZ Route
* Unit 5 activity
**************************/
router.get(
  "/getInventory/:classification_id",
  // utilities.checkAccountType,
  utilities.handleErrors(invController.getInventoryJSON))

module.exports = router;