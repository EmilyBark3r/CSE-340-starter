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
const classificationSelect = await utilities.getClassificationOptions()
res.render("./inventory/management", {
  title: 'Vehicle Management',
  nav,
  errors: null,
  classificationSelect
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
  let classificationSelect = await utilities.getClassificationOptions()
  res.render("./inventory/add-inventory", {
    title: 'Add Inventory',
    nav,
    classificationSelect
  })}


// add a new vehicle (?)
// invCont.addNewClassification = async function (req, res, next) {
// let nav = await utilities.getNav()
// res.render("/", {
//   title: 'Add new Vehicle Classification',
//   nav
// })}

/* ***************************
 *  Update Inventory Data
 * ************************** */
invCont.updateInventory = async function (req, res, next) {
  let nav = await utilities.getNav()
  const {
    inv_id,
    inv_make,
    inv_model,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_year,
    inv_miles,
    inv_color,
    classification_id,
  } = req.body
  const updateResult = await invModel.updateInventory(
    inv_id,  
    inv_make,
    inv_model,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_year,
    inv_miles,
    inv_color,
    classification_id
  )

  if (updateResult) {
    const itemName = updateResult.inv_make + " " + updateResult.inv_model
    req.flash("notice", `The ${itemName} was successfully updated.`)
    res.redirect("/inv/")
  } else {
    const classificationSelect = await utilities.buildClassificationList(classification_id)
    const itemName = `${inv_make} ${inv_model}`
    req.flash("notice", "Sorry, the insert failed.")
    res.status(501).render("inventory/edit-inventory", {
    title: "Edit " + itemName,
    nav,
    classificationSelect: classificationSelect,
    errors: null,
    inv_id,
    inv_make,
    inv_model,
    inv_year,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_miles,
    inv_color,
    classification_id
    })
  }
}

/* ****************************************
*  Process add new classification
* *************************************** */
invCont.buildNewClassification = async function (req, res) {
  let nav = await utilities.getNav()
  const { classification_name} = req.body

// // password hashing activity
const regResult = await invModel.addNewClassification(classification_name)
  if (regResult) {
    req.flash(
      "notice",
      `${classification_name} has been added.`
    )
    res.status(201).render("inventory/management", {
      title: "Management View",
      nav,
    })
  } else {
    req.flash("notice", "Sorry, the classification failed.")
    res.status(501).render("inventory/add-classification/", {
      title: "Add Classification",
      nav,
      errors: null,
    })
  }
}

// process adding vehicle (?)


/* ***************************
 *  Return Inventory by Classification As JSON
 * ************************** */
invCont.getInventoryJSON = async (req, res, next) => {
  const classification_id = parseInt(req.params.classification_id)
  const invData = await invModel.getInventoryByClassificationId(classification_id)
  if (invData[0].inv_id) {
    return res.json(invData)
  } else {
    next(new Error("No data returned"))
  }
}

/* ***************************
 *  Build edit inventory view
 * ************************** */
invCont.editInventoryView = async function (req, res, next) {
  const inv_id = parseInt(req.params.inv_id)
  let nav = await utilities.getNav()
  const itemData = await invModel.getInventoryById(inv_id)
  const classificationSelect = await utilities.buildClassificationList(itemData.classification_id)
  const itemName = `${itemData.inv_make} ${itemData.inv_model}`
  res.render("./inventory/edit-inventory", {
    title: "Edit " + itemName,
    nav,
    classificationSelect: classificationSelect,
    errors: null,
    inv_id: itemData.inv_id,
    inv_make: itemData.inv_make,
    inv_model: itemData.inv_model,
    inv_year: itemData.inv_year,
    inv_description: itemData.inv_description,
    inv_image: itemData.inv_image,
    inv_thumbnail: itemData.inv_thumbnail,
    inv_price: itemData.inv_price,
    inv_miles: itemData.inv_miles,
    inv_color: itemData.inv_color,
    classification_id: itemData.classification_id
  })
}

module.exports = invCont