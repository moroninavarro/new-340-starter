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
    title: className + " vehicles",
    nav,
    grid,
  })
}
/* ***************************
 *  Build inventory view
 * ************************** */
invCont.buildByinventoryId = async function (req, res, next) {
  const inv_id = req.params.inventoryId
  const data = await invModel.getinventoryByinvId(inv_id)
  const grid = await utilities.buildInventoryGrid(data)
  let nav = await utilities.getNav()
  const invName = data.inv_year + " " + data.inv_make + " " + data.inv_model
  res.render("./inventory/inventoryview", {
    title: invName + " ",
    nav,
    grid,
  })

}
// Example of route for my site-name/inv/
invCont.buildBymanagement = async function (req, res, next) {
  let nav = await utilities.getNav()
  res.render("./inventory/management", {
    title:"Vehicle Management",
    nav,
  })

}

  module.exports = invCont