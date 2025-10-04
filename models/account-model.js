const pool = require("../database/index")

/* *****************************
*   Register new account
* *************************** */
async function registerAccount(account_firstname, account_lastname, account_email, account_password){
  try {
    const sql = "INSERT INTO account (account_firstname, account_lastname, account_email, account_password, account_type) VALUES ($1, $2, $3, $4, 'Client') RETURNING *"
    return await pool.query(sql, [account_firstname, account_lastname, account_email, account_password])
  } catch (error) {
    return error.message
  }
}


/* **********************
 *   Check for existing email
 * ********************* */
async function checkExistingEmail(account_email){
  try {
    const sql = "SELECT * FROM account WHERE account_email = $1"
    const email = await pool.query(sql, [account_email])
    return email.rowCount
  } catch (error) {
    return error.message
  }
}


/* *****************************
* Return account data using email address
* ***************************** */
async function getAccountByEmail (account_email) {
  try {
    const result = await pool.query(
      'SELECT account_id, account_firstname, account_lastname, account_email, account_type, account_password FROM account WHERE account_email = $1',
      [account_email])
    return result.rows[0]
  } catch (error) {
    return new Error("No matching email found")
  }
}



/* ***************************
 *  Update account data
 * ************************** */
async function updateAccount(
  account_id,
  account_firstname,
  account_lastname,
  account_email,
) {
  try {
    const sql =
      `UPDATE account 
      SET account_firstname = $1,
      account_lastname = $2, 
      account_email = $3 
      WHERE account_id = $4 RETURNING *`
    const data = await pool.query(sql, [
    account_firstname,
    account_lastname,
    account_email,
    account_id,
    ])
    return data.rows[0]
  } catch (error) {
    console.error("UpdateAccount error: ", error)
    return null
  }
}

/* ***************************
 *  Update account Password
 * ************************** */
const bcrypt = require("bcryptjs")
async function updatePassword(
  account_id,
  account_password,
) {
  try {
    const hashedPassword = await bcrypt.hash(account_password, 10)
    const sql =
      `UPDATE account 
      SET account_password = $1
      WHERE account_id = $2 RETURNING *`
    const data = await pool.query(sql, [
   hashedPassword,
    account_id])
    return data.rows[0]
  } catch (error) {
    console.error("UpdatePassword error: ", error)
    return null
  }
}



//My new function Unit 5
async function getAccountByaccountId(account_id) {
  try{
    const thedata = await pool.query(
       `SELECT * FROM public.account
      WHERE account_id = $1`,
      [account_id]
    )
    return thedata.rows[0]
  } catch (error) {
    console.error("getAccountId error " + error)
  }
}
module.exports = {registerAccount, checkExistingEmail, getAccountByEmail, updateAccount, getAccountByaccountId, updatePassword }