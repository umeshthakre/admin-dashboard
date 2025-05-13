import { Router } from "express";
import userController from "../controllers/userController.js";
import { updateUserValidator } from "../middlewares/validators.js";
import validateErrors from "../middlewares/validateErrors.js";
import { authenticateToken } from "../helpers/jwt.js";
const router = Router();

router.get("/",authenticateToken,userController.getAllUsers.bind(userController))

router.get("/:id",authenticateToken,userController.getUserDetails.bind(userController))

router.put("/:id", authenticateToken,updateUserValidator, validateErrors, userController.updateUser.bind(userController))

export default router;