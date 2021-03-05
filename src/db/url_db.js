const sql = require('sql-template-strings')
const { v4: uuidv4 } = require('uuid')
const db = require('./db')

module.exports = {
  async create(shorten, url, visit) {
    try {
      const { rows } = await db.query(sql`
      INSERT INTO urls (id,shorten_url, url, visit)
        VALUES (${uuidv4()}, ${shorten}, ${url}, ${visit})
        RETURNING shorten_url, url, visit;
      `)
      return rows
    } catch (error) {
      if (error.constraint === 'shorten_url_key') {
        return null
      }

      throw error
    }
  },
  async update(shorten) {
    console.log(shorten)
    try {
      const { rows } = await db.query(sql`
      UPDATE urls SET visit = ${shorten.visit + 1} WHERE id=${
        shorten.id
      };`)
    } catch (error) {
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
