import express from "express";
import {UserRegister} from "../controllers/UserController.js";
var router = express.Router();

router.post("/register", UserRegister);

export default router;
