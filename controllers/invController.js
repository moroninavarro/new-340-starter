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
  const classificationSelect = await utilities.buildClassificationList()
  res.render("./inventory/management", {
    title:"Vehicle Management",
    nav,
    error: null,
    classificationSelect,
  })

}

// Example of route for add-classification
invCont.buildByaddClassification = async function (req, res, next) {
  try{ 
    const userInput = req.body.classification_name.trim();
    
    const newCategory = await invModel.addClassifications(userInput);
  
    res.redirect('/inventory/management');
    let nav = await utilities.getNav()
     res.render("./inventory/add-classification", {
       
       title:"Add Classification",
       nav,
       errors: null,
       newCategory,});
   } catch (error) {  
     
    } 
  }
//
invCont.buildByaddClassification2 = async function (req, res, next) {

   let nav = await utilities.getNav()
    res.render("./inventory/add-classification", {
      title:"Add Classification",
      nav,
      errors: null,
    });
    
  }

// Example of route for add-inventory
invCont.buildByaddInventory = async function (req, res, next) {
    let nav = await utilities.getNav()
    const classificationSelect = await utilities.buildClassificationList()
    res.render("./inventory/add-inventory", {
      
      title:"Add Vehicle",
      nav,
      errors: null,
      classificationSelect,
    })
    
  }


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


//new function Update Inventory Information (Step 1)
//this will build the "edit inventory" view
invCont.editInventoryId = async function (req, res, next) {
  const inv_id = parseInt(req.params.inv_id)
    let nav = await utilities.getNav()
    const itemData = await invModel.getinventoryByinvId(inv_id)
    const classificationSelect = await utilities.buildClassificationList(itemData.classification_id)
    const itemName = `${itemData.inv_make} ${itemData.inv_model}`
    res.render("./inventory/edit-inventory", {
      
      title:"Edit " + itemName,
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

// Example of route for add-inventory
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
    res.redirect("/inv/management")
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


  module.exports = invCont