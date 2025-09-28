const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController");
const utilities = require("../utilities")
const validate = require("../utilities/account-validation");
// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);

//Route to build inventory by ID view
router.get("/detail/:inventoryId", invController.buildByinventoryId);
//example of route for my site-name/inv/
router.get("/management", invController.buildBymanagement);
//example task 2
router.get("/add-classification", invController.buildByaddClassification2);
//task 2
router.post("/add-classification",
  validate.classificationRules(),
  validate.checkClassificationData,
  utilities.handleErrors (invController.buildByaddClassification));


//example task 3
router.get("/add-inventory", invController.buildByaddInventory);
module.exports = router;