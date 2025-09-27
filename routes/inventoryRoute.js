const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController");

// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);

//Route to build inventory by ID view
router.get("/detail/:inventoryId", invController.buildByinventoryId);
//example of route for my site-name/inv/
router.get("/management", invController.buildBymanagement);
module.exports = router;