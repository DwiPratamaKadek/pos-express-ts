import { Router } from "express";
import { StockMovementController } from "../../controller/inventory/StockMovementController";

const router =  Router()

router.get("/", StockMovementController.get)
router.post("/", StockMovementController.creted)
router.put("/:id",StockMovementController.update)
router.delete("/:id",StockMovementController.delete)

export default router;
