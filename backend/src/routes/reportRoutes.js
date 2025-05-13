import { Router } from "express";
import userController from "../controllers/reportController.js";
import { reportValidator } from "../middlewares/validators.js";
import validateErrors from "../middlewares/validateErrors.js";
import reportController from "../controllers/reportController.js";
import { authenticateToken } from "../helpers/jwt.js";
const router = Router();

router.get("/", authenticateToken,reportController.getReports.bind(reportController))
router.post("/generateReport", authenticateToken,reportValidator, validateErrors, reportController.generateReport.bind(reportController))
router.get("/analytics",authenticateToken,reportController.getAnalytics.bind(reportController))
router.post("/generateRandomReport",authenticateToken,reportController.generateRandomReport.bind(reportController))
router.post("/updateStatus/:id",authenticateToken,reportController.updateStatus.bind(reportController))

export default router;