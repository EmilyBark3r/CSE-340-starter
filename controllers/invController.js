const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " Vehicles",
    nav,
    grid,
  })
}

/* ***************************
 *  Build vehicle by inventory id
 * ************************** */
invCont.buildByInventoryId = async function(req, res, next) {
  const inv_id = req.params.invId
  const data = await invModel.getVehicleByInventoryId(inv_id)
  let nav = await utilities.getNav()
  let single = await utilities.buildSingleCarView(data)
  // console.log(single)
  const inv_make = data[0].inv_make
  const inv_model = data[0].inv_model
  const inv_year = data[0].inv_year
  res.render("./inventory/detail", {
    title: inv_year + ' ' + inv_make + ' ' + inv_model,
    nav,
    single
  })
}

/* ***************************
 *  Build Server Error Link
 * ************************** */
invCont.error = async function (req, res, next){
  const string_error = "This is an error"
  string_error = "This is an intentional error"
  let nav = await utilities.getNav()
  res.render("./errors/error", {
    title: 'Server Error',
    message,
    nav
  })
}
//mangement view
invCont.buildMangementView = async function (req, res, next){
let nav = await utilities.getNav()
res.render("./inventory/management", {
  title: 'Management View',
  nav
})}

// Add-classification
invCont.buildClassificationView = async function (req, res, next){
  let nav = await utilities.getNav()
  res.render("./inventory/add-classification", {
    title: 'Add Classification',
    nav
  })}

// Add-inventory
invCont.buildInventoryView = async function (req, res, next){
  let nav = await utilities.getNav()
  res.render("./inventory/add-inventory", {
    title: 'Add Inventory',
    nav
  })}

// add a new vehicle
// process new classification
// process adding vehicle

module.exports = invCont