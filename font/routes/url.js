import express from 'express'
import {
  handleGenerateNewShortURL,
  handleGetAnalytics,
} from '../controllers/url.js'
//const express = require("express");
/*const {
  handleGenerateNewShortURL,
  handleGetAnalytics,
} = require("../controllers/url");*/

const router = express.Router();

router.post("/", handleGenerateNewShortURL);

router.get("/analytics/:shortId", handleGetAnalytics);

//module.exports = router;

export default router;