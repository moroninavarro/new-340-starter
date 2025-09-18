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

module.exports = {getClassifications, getInventoryByClassificationId, getinvid, getinventoryByinvId};