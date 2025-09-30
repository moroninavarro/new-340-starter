  const inventoryModel = require("../models/inventory-model")
  const utilities = require(".")
  const { body, validationResult } = require("express-validator")
  const validate = {}

  /*  **********************************
    *  Registration Data Validation Rules
    * ********************************* */
    validate.newInventoryRules = () => {
      return [
        // 
        body("inv_make")
          .trim()
          .escape()
          .notEmpty()
          .isLength({ min: 1 })
          .withMessage("Please provide a correct make."), // on error this message is sent.
    
        // 
        body("inv_model")
          .trim()
          .escape()
          .notEmpty()
          .isLength({ min: 2 })
          .withMessage("Please provide a correct model."), // on error this message is sent.
    
        // 
        body("inv_description")
          .trim()
          .escape()
          .notEmpty()
          .isLength({ min: 2 })
          .withMessage("Please provide a correct description."),
        
        //
        body("inv_image")
          .trim()
          .escape()
          .notEmpty()
          .isLength({ min: 2 })
          .withMessage("Please provide a correct image."),
    

        //
        body("inv_thumbnail")
          .trim()
          .escape()
          .notEmpty()
          .isLength({ min: 2 })
          .withMessage("Please provide a correct image thumbnail."),

        //
        body("inv_price")
          .trim()
          .escape()
          .notEmpty()
          .isLength({ min: 2 })
          .withMessage("Please provide a correct price."),

        //
        body("inv_year")
          .trim()
          .escape()
          .notEmpty()
          .isLength({ min: 2 })
          .withMessage("Please provide a correct year."),

        //
        body("inv_miles")
          .trim()
          .escape()
          .notEmpty()
          .isLength({ min: 2 })
          .withMessage("Please provide a correct mile."),

        // 
        body("inv_color")
          .trim()
          .notEmpty()
          .isStrongPassword({
            minLength: 12,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
          })
          .withMessage("Please provide a correct color."),
      ]
    }



/* ******************************
    * errors will be directed back to the edit view.
    * ***************************** */
validate.checkUpdateData = async (req, res, next) => {
    const { inv_make,inv_model, inv_description, inv_image, inv_thumbnail, inv_price, inv_year, inv_miles, inv_color, inv_id } = req.body
    let errors = []
    errors = validationResult(req)
    if (!errors.isEmpty()) {
    let nav = await utilities.getNav()
    res.render("update/edit-inventory", {
        errors,
        title: "Edit",
        nav,
        inv_make,
        inv_model,
        inv_description,
        inv_image, 
        inv_thumbnail, 
        inv_price, 
        inv_year, 
        inv_miles, 
        inv_color,
        inv_id,
    })
    return
    }
    next()
}


module.exports = validate