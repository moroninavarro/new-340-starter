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
 *  Build inventory by inv_id view
 * ************************** */
invCont.buildByinventoryId = async function (req, res, next) {
  const inv_id = req.params.inventoryId
  const data = await invModel.getinventoryByinvId(inv_id)
  const grid = await utilities.buildInventoryGrid(data)
  let nav = await utilities.getNav()
  res.render("./inventory/inventoryview", {
    title: data.inv_make + "vehicleees" + data.inv_model,
    nav,
    grid,
  })

}
  module.exports = invCont