import { Router } from "express";
import {
  createServiceController,
  updateServiceController,
  getServiceController,
  getAllServicesController,
  deleteServiceController,
  updateServiceStatusController,
  getStaffSlotsByServiceController,
} from "./serviceController";
import { authMiddleware } from "../../middlewares/authMiddleware";

const router = Router();

router.post("/", createServiceController);
router.put("/:serviceId", updateServiceController);
router.get("/:serviceId", getServiceController);
router.get("/", getAllServicesController);
router.delete("/:serviceId", deleteServiceController);
router.patch("/:serviceId/status", updateServiceStatusController);
router.post(
  "/staff-slots",authMiddleware,
  getStaffSlotsByServiceController
);

export default router;
