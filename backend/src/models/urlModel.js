import pool from "../config/db.js";

export const createUrl = async (shortId, originalUrl) => {
  const query = `
        INSERT INTO urls (short_id, original_url)
        VALUES ($1, $2) RETURNING *;
    `;
  const result = await pool.query(query, [shortId, originalUrl]);
  return result.rows[0];
};

export const findUrlByShortId = async (shortId) => {
  const query = `SELECT * FROM urls WHERE short_id = $1`;
  const result = await pool.query(query, [shortId]);
  return result.rows[0];
};

export const incrementClicks = async (shortId) => {
  const query = `
        UPDATE urls SET clicks = clicks + 1 WHERE short_id = $1 RETURNING *;
    `;
  const result = await pool.query(query, [shortId]);
  return result.rows[0];
};

export const getAllUrls = async () => {
  const result = await pool.query(`SELECT * FROM urls ORDER BY created_at DESC`);
  return result.rows;
};



