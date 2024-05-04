import { Request, Response } from "express";

const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

router.put("/card", adminController.create_card);

module.exports = router;
