import express from "express";
import { handleAdminLogin } from "../controllers/adminController.js";

const router = express.Router();

router.post("/login", handleAdminLogin);

export default router;