//redis setup

const redis = require('redis')
const { promisify } = require('util')

let client = redis.createClient({
  host: 'redis',
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
const getList = promisify(client.lrange).bind(client)

module.exports = {
  get,
  set,
  getList,
}
