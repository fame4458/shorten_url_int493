const express = require('express')
const shortId = require('shortid')

const router = express.Router()

const url_db = require('../db/url_db')

router.post('/link', async (req, res) => {
  const randomUrl = shortId.generate()
  const realUrl = req.body.url
  //เอา randomUrl = shortenUrl กับ req.body.url = fullUrl ไปเก็บใน DB
  await url_db.create(randomUrl, realUrl, 0)
  const data = {
    link: `http://lb.shortern.a4.tnpl.me:8000/shorten/${randomUrl}`,
  }
  res.json(data)
})

router.get('/shorten/:shorten_url', async (req, res) => {
  //   เอา shorten_url ไปหาใน db
  let response = await url_db.find(req.params.shorten_url)
  if (!response) return res.sendStatus(404)

  //func update visit here
  err = await url_db.update(response)
  if (err) {
    return res.sendStatus(500)
  }

  res.redirect(response.url)
})

router.get('/l/:shorten_url/stats', async (req, res) => {
  const response = await url_db.find(req.params.shorten_url)
  if (!response) return res.sendStatus(404)

  const data = {
    visit: response.visit,
  }

  res.json(data)
})

module.exports = router
