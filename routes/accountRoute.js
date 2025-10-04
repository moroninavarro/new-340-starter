const regValidate = require('../utilities/account-validation')
const express = require("express")
const router = new express.Router() 
const accountController = require("../controllers/accountController")
const utilities = require("../utilities")
router.get("/login", utilities.handleErrors(accountController.buildLogin));
router.get("/register", utilities.handleErrors(accountController.buildRegister));
router.get("/loginview", utilities.handleErrors(accountController.buildLoginview));
//We will write this route as a team
router.get("/", utilities.checkLogin, utilities.handleErrors(accountController.buildManagement))
//The RegisterAcoount Route
router.post("/registration", utilities.handleErrors(accountController.registerAccount));
// Process the registration data
router.post(
  "/register",
  regValidate.registationRules(),
  regValidate.checkRegData,
  utilities.handleErrors(accountController.registerAccount)
)

// Process the login attempt
router.post(
  "/login",
  regValidate.loginRules(),
  regValidate.checkLoginData,
  utilities.handleErrors(accountController.accountLogin)
)

//Assignment 5
router.post("/updateinfo", 
  // valid.newInventoryRules(), 
  // valid.checkUpdateData, 
  utilities.handleErrors(accountController.updateInfo));

//Assignment Unit 5 this one is for the password update
router.post("/updatepassword", utilities.handleErrors(accountController.updatePassword));

//Update view
router.get("/changeinfo", utilities.handleErrors(accountController.updateview));

//logout
router.get("/logout", utilities.handleErrors(accountController.buildLogout));


module.exports = router;