import pool from "../config/database.js";

export const insertChatMessage = async ({ user_id, sender_type, message, name }) => {
  const result = await pool.query(
    `INSERT INTO my_portfolio.chat_messages (user_id, sender_type, message, name)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [user_id, sender_type, message, name]
  );

  return result.rows[0];
};

export const getChatUsersList = async () => {
  const result = await pool.query(`
    SELECT DISTINCT user_id, name
    FROM my_portfolio.chat_messages
    WHERE sender_type != 'admin'
    ORDER BY user_id
  `);

  return result.rows;
};

export const getChatMessagesByUser = async (user_id) => {
  const result = await pool.query(
    `SELECT * FROM my_portfolio.chat_messages
     WHERE user_id = $1
     ORDER BY created_at ASC`,
    [user_id]
  );

  return result.rows;
};