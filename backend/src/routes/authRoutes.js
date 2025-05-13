import { Router } from "express";
import { body } from "express-validator";
import { loginValidator, signupValidator } from "../middlewares/validators.js";
import authService from "../services/authService.js";
import authController from "../controllers/authController.js";
import validateErrors from "../middlewares/validateErrors.js";
import { authenticateToken } from "../helpers/jwt.js";

const router = Router();


router.post('/auth/login',loginValidator,validateErrors, authController.login.bind(authController))

router.post('/auth/signup',signupValidator,validateErrors, authController.signup.bind(authController))



export default router;