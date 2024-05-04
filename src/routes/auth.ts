import { Request, Response } from "express";

const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/user", authController.retrieve_user);
router.post("/register", authController.register_user);
router.post("/login", authController.login_user);
router.get("/logout", authController.logout_user);
router.get("/profile", authController.get_profile);

module.exports = router;
