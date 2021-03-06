//redis setup

const redis = require('redis')
const { promisify } = require('util')

let client = redis.createClient({
  host: process.env.REDIS,
  password: 'sOmE_sEcUrE_pAsS',
})

client.on('connect', () => {
  console.log('Redis client connected')
})

client.on('error', (error) => {
  console.error(error)
})

const get = promisify(client.get).bind(client)
const set = promisify(client.set).bind(client)
const incr = promisify(client.incr).bind(client)

module.exports = {
  get,
  set,
  incr,
}
