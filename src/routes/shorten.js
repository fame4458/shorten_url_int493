const express = require('express')
const shortId = require('shortid')

const router = express.Router()

const url_db = require('../db/url_db')

router.post('/shorten', async (req, res) => {
  const randomUrl = shortId.generate()
  const realUrl = req.body.url
  //เอา randomUrl = shortenUrl กับ req.body.url = fullUrl ไปเก็บใน DB
  await url_db.create(randomUrl, realUrl)
  res.send(randomUrl)
})

router.get('/shorten/:shorten_url', async (req, res) => {
  //   เอา shorten_url ไปหาใน db
  const response = await url_db.find(req.params.shorten_url)
  if (!response) return res.sendStatus(404)
  // เอา fullUrl เต็มๆใส่ใน redirect
  res.send(response.url)
})

module.exports = router
