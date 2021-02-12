const sql = require('sql-template-strings')
const { v4: uuidv4 } = require('uuid')
const db = require('./db')

module.exports = {
  async create(shorten, url) {
    try {
      const { rows } = await db.query(sql`
      INSERT INTO urls (id,shorten_url, url)
        VALUES (${uuidv4()}, ${shorten}, ${url})
        RETURNING shorten_url, url;
      `)
      return rows
    } catch (error) {
      if (error.constraint === 'shorten_url_key') {
        return null
      }

      throw error
    }
  },
  async find(shorten) {
    const { rows } = await db.query(sql`
    SELECT * FROM urls WHERE shorten_url=${shorten} LIMIT 1;
    `)
    return rows[0]
  },
}
