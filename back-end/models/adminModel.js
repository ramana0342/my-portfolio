

import pool from "../config/database.js";

export const findAdminByEmailMobile = async (email, mobile) => {
  const result = await pool.query(
    `SELECT * FROM my_portfolio.admin 
     WHERE email = $1 OR mobile = $2`,
    [email || null, mobile || null]
  );

  return result.rows[0];
};