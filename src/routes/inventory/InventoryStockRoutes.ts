import { Router } from "express";
import { InventoryStockController } from "../../controller/inventory/InventoryStockController";

const router =  Router()

router.get("/", InventoryStockController.get)
router.post("/", InventoryStockController.creted)
router.put("/:id",InventoryStockController.update)
router.delete("/:id",InventoryStockController.delete)

export default router;
