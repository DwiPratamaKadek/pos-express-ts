import { Router } from "express";
import { CashierController } from "../../controller/cashier/CashierController";

const router =  Router()

// router.get("/", CashierController.get)
router.post("/", CashierController.creted)
// router.put("/:id",CashierController.update)
// router.delete("/:id",CashierController.delete)

export default router;
