import pool from "../config/database.js";

export const createConversation = async (conversationId) => {
  const query = `
    INSERT INTO my_portfolio.ais_conversations
    (
      conversation_id
    )
    VALUES($1)
    ON CONFLICT (conversation_id)
    DO NOTHING
  `;

  await pool.query(query, [conversationId]);
};


export const saveMessage = async (
  conversationId,
  role,
  message
) => {
  const query = `
    INSERT INTO my_portfolio.ais_messages
    (
      conversation_id,
      role,
      message
    )
    VALUES($1, $2, $3)
  `;

  await pool.query(query, [
    conversationId,
    role,
    message
  ]);
};


/*
  Used by Gemini.
  Only the latest 20 messages are sent
  as conversation context.
*/
export const getConversationHistory = async (
  conversationId
) => {
  const query = `
    SELECT
      role,
      message
    FROM my_portfolio.ais_messages
    WHERE conversation_id = $1
    ORDER BY created_at DESC
    LIMIT 20
  `;

  const result = await pool.query(query, [
    conversationId
  ]);

  return result.rows.reverse();
};


/*
  Used by the frontend.
  Returns the complete conversation
  so previous messages can be displayed.
*/
export const getConversationMessages = async (
  conversationId
) => {
  const query = `
    SELECT
      role,
      message,
      created_at
    FROM my_portfolio.ais_messages
    WHERE conversation_id = $1
    ORDER BY created_at ASC
  `;

  const result = await pool.query(query, [
    conversationId
  ]);

  return result.rows;
};