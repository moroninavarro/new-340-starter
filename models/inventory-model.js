const pool = require("../database/")

/* ***************************
 *  Get all classification data
 * ************************** */
async function getClassifications(){
  return await pool.query("SELECT * FROM public.classification ORDER BY classification_name")
}


/* ***************************
 *  Get all inv data
 * ************************** */
async function getinvid(){
  return await pool.query("SELECT * FROM public.inventory ORDER BY inv_id")
}


/* ***************************
 *  Get all inventory items and classification_name by classification_id
 * ************************** */
async function getInventoryByClassificationId(classification_id) {
  try {
    const data = await pool.query(
      `SELECT * FROM public.inventory AS i 
      JOIN public.classification AS c 
      ON i.classification_id = c.classification_id 
      WHERE i.classification_id = $1`,
      [classification_id]
    )
    return data.rows
  } catch (error) {
    console.error("getclassificationsbyid error " + error)
  }
}
//My new function
async function getinventoryByinvId(inv_id) {
  try{
    const thedata = await pool.query(
       `SELECT * FROM public.inventory
      WHERE inv_id = $1`,
      [inv_id]
    )
    return thedata.rows[0]
  } catch (error) {
    console.error("getinvbyid error " + error)
  }
}

/* ***************************
 *  Get new classification and add to the database
 * ************************** */
async function addClassifications(title){
  const sql = `INSERT INTO classification (classification_name) VALUES ($1) RETURNING *;`;
  const values = [title];
  const result = await pool.query(sql, values);
  return result.rows[0];
}




/* ***************************
 *  Update Inventory Data
 * ************************** */
async function updateInventory(
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
) {
  try {
    const sql =
      "UPDATE public.inventory SET inv_make = $1, inv_model = $2, inv_description = $3, inv_image = $4, inv_thumbnail = $5, inv_price = $6, inv_year = $7, inv_miles = $8, inv_color = $9, classification_id = $10 WHERE inv_id = $11 RETURNING *"
    const data = await pool.query(sql, [
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
      inv_id
    ])
    return data.rows[0]
  } catch (error) {
    console.error("model error: " + error)
  }
}

module.exports = {getClassifications, getInventoryByClassificationId, getinvid, getinventoryByinvId, addClassifications, updateInventory};