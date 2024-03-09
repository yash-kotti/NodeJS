const express = require("express");
const router = express.Router();

const {
  handleGenerateShortURL,
  handleGetURL,
  handleAnalytics,
} = require("../controllers/url");
// console.log("Inside URL Router");

router.post("/", handleGenerateShortURL);
router.get("/:shortId", handleGetURL);
router.get("/analytics/:shortId", handleAnalytics);

module.exports = router;
