const express = require('express')
const shortId = require('shortid')
const url_db = require('../db/url_db')
const redis = require('../db/redis')
const router = express.Router()

router.post('/link', async (req, res) => {
  let data
  const realUrl = req.body.url
  const link = await redis.get(req.body.url).catch((err) => {
    if (err) console.error(err)
  })
  if (link) {
    data = {
      link,
    }
    res.json(data)
    return
  }
  // let response = await url_db.findGenerateUrl(realUrl)
  let response = false
  if (!response) {
    const randomUrl = shortId.generate()
    // await url_db.create(randomUrl, realUrl, 0)
    data = {
      link: `http://lb.shortern.a4.tnpl.me:8000/shorten/${randomUrl}`,
      randomUrl: randomUrl,
      visit: 0,
    }
  } else {
    data = {
      link: `http://lb.shortern.a4.tnpl.me:8000/shorten/${response.shorten_url}`,
      randomUrl: response.shorten_url,
      visit: response.visit,
    }
  }
  await redis.set(
    data.randomUrl,
    `{ "realUrl":"${realUrl}", "visit": "${data.visit}" }`
  )
  await redis.set(`${data.randomUrl}_visit`, data.visit)
  await redis.set(realUrl, data.link)

  res.json(data)
  return
})

router.get('/shorten/:shorten_url', async (req, res) => {
  const shorten_url = req.params.shorten_url
  const message = await redis.get(shorten_url).catch((err) => {
    if (err) console.error(err)
  })
  console.log(message)
  if (message) {
    var obj = JSON.parse(message)
    redis.incr(`${shorten_url}_visit`)
    res.redirect(obj.realUrl)
    return
  }

  //   เอา shorten_url ไปหาใน db
  // let response = await url_db.find(req.params.shorten_url)
  // if (!response) return res.sendStatus(404)

  // //func update visit here
  // err = await url_db.update(response)
  // if (err) {
  //   return res.sendStatus(500)
  // }

  // res.redirect(response.url)
  return
})

router.get('/shorten/:shorten_url/stats', async (req, res) => {
  const visit = await redis
    .get(`${req.params.shorten_url}_visit`)
    .catch((err) => {
      if (err) console.error(err)
    })
  if (visit) {
    const data = {
      visit: parseInt(visit),
    }

    res.json(data)
    return
  }

  // const response = await url_db.find(req.params.shorten_url)
  // if (!response) return res.sendStatus(404)

  // const data = {
  //   visit: response.visit,
  // }

  // res.json(data)
  // return
})

module.exports = router
