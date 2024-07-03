import shortid from 'shortid'
import URL from '../models/url.js'
//const shortid = require("shortid");
//const URL = require("../models/url");

export const handleGenerateNewShortURL=(req, res) => {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "url is required" });
  const shortID = shortid();

   URL.create({
    shortId: shortID,
    redirectURL: body.url,
    visitHistory: [],
    createdBy: req.user._id,
  });

  return res.render("2 course and architecture for CI 1", {
    id: shortID,
  });
}

export const handleGetAnalytics=(req, res)=>  {
  const shortId = req.params.shortId;
  const result =  URL.findOne({ shortId });
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

/*module.exports = {
  handleGenerateNewShortURL,
  handleGetAnalytics,
};*/