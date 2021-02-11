const express = require("express");
const shortId = require("shortid");

const router = express.Router();

router.post("/shorten", (req, res) => {
  let randomUrl = shortId.generate();
  console.log(req.body.url);
  res.send(randomUrl);
  //เอา randomUrl = shortenUrl กับ req.body.url = fullUrl ไปเก็บใน DB
});

router.get("/:id", (req, res) => {
  console.log(req.params.id);
  //   เอา id ไปหาใน db
  // const shortUrl = await
  //   if(shortUrl == null) return res.sendStatus(404)
  // เอา fullUrl เต็มๆใส่ใน redirect
  //   res.redirect()
});

module.exports = router;
