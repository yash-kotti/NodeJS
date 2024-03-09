const shortid = require("shortid");
const URL = require("../models/url");

async function handleGenerateShortURL(req, res) {
  // console.log("Inside handle Get req");
  const body = req.body;
  console.log(body);
  if (!body.url) {
    res.status(400).json({ Error: "Provide URL" });
  }
  const shortIdGen = shortid(8);
  await URL.create({
    shortId: shortIdGen,
    redirectURL: body.url,
    visitHistory: [],
  });
  res.render("Home", { id: shortIdGen });
  // res.json({ id: shortIdGen });
}

async function handleGetURL(req, res) {
  const shortId = req.params.shortId;
  console.log("Short ID : " + shortId);
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: { timestamp: Date.now() },
      },
    }
  ); // This fn will find the DOM with id and update the visithistory in it and return the document in the entry
  // The name in the id should be same as you want to search.
  console.log(entry);
  res.redirect(entry.redirectURL);
}

async function handleAnalytics(req, res) {
  const shortId = req.params.shortId;
  const entry = await URL.findOne({
    shortId,
  });
  const clicks = entry.visitHistory.length;
  res.json({ Visited: clicks, analytics: entry.visitHistory });
}

module.exports = { handleGenerateShortURL, handleGetURL, handleAnalytics };
