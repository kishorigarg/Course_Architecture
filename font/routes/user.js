import express from 'express'
import { handleUserSignup, handleUserLogin } from '../controllers/user.js'
//const express = require("express");
//const { handleUserSignup, handleUserLogin } = require("../controllers/user");

const router = express.Router();

router.post("/", handleUserSignup);
router.post("/login", handleUserLogin);

//module.exports = router;

export default router;