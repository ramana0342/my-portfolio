

import pool from "../config/database.js";
import { userMessageId } from '../utils/idGenerator.js'
import { sendMailToAdmin } from "../controllers/handleSendMessageToAdmin.js"
import { sendMailToUserForSuccesSentContact } from "../controllers/handleSuccessMessageToUser.js";

export const insertUserContactMessageData = async (data) => {
  const { name, email, mobile, message } = data;
  const id = userMessageId();

  const result = await pool.query(
    `INSERT INTO my_portfolio.users_contact_messages (id, name, email, mobile, message)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [id, name, email, mobile, message]
  );

  Promise.allSettled([
    sendMailToAdmin({ name, email, mobile, message }),
    sendMailToUserForSuccesSentContact({ name, email, mobile, message }),
  ]).then((results) => {
    results.forEach((res, index) => {
      if (res.status === "rejected") {
        console.error(
          index === 0 ? "Admin email failed:" : "User email failed:",
          res.reason
        );
      }
    });
  });

  return result.rows[0];
};

export const userContactMessageData = async (search) => {
  let query = `
    SELECT * FROM my_portfolio.users_contact_messages
    WHERE 1=1
  `;

  let values = [];
  let i = 1;

  if (search) {
    query += `
      AND (
        name ILIKE $${i}
        OR email ILIKE $${i}
        OR mobile ILIKE $${i}
        OR message ILIKE $${i}
      )
    `;
    values.push(`%${search}%`);
    i++;
  }

  query += ` ORDER BY created_at DESC`;

  const result = await pool.query(query, values);

  return result.rows;
};

export const userContactMessageCount = async () => {
  const result = await pool.query(
    `SELECT COUNT(*) AS total FROM my_portfolio.users_contact_messages`
  );
  return parseInt(result.rows[0].total, 10);
};


export const deleteUserContactMessageById = async (id) => {
  const result = await pool.query(
    `DELETE FROM my_portfolio.users_contact_messages
     WHERE id = $1
     RETURNING *`,
    [id]
  );
  return result.rows[0];
};